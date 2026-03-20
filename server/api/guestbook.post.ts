import { serverSupabaseClient } from '#supabase/server';
import { getRequestIP } from 'h3';
import { applyRateLimit } from '../utils/rate-limit';

interface GuestbookInsertBody {
  message?: string;
}

interface AuthUserLike {
  email?: string | null;
  user_metadata?: Record<string, unknown>;
}

const getAvatarUrl = (user: AuthUserLike) => {
  const metadata = user.user_metadata || {};

  if (typeof metadata.avatar_url === 'string' && metadata.avatar_url.trim()) {
    return metadata.avatar_url.trim();
  }

  if (typeof metadata.picture === 'string' && metadata.picture.trim()) {
    return metadata.picture.trim();
  }

  return null;
};

const getDisplayName = (user: AuthUserLike) => {
  const metadata = user.user_metadata || {};

  if (typeof metadata.full_name === 'string' && metadata.full_name.trim()) {
    return metadata.full_name.trim();
  }

  if (typeof metadata.name === 'string' && metadata.name.trim()) {
    return metadata.name.trim();
  }

  if (
    typeof metadata.preferred_username === 'string' &&
    metadata.preferred_username.trim()
  ) {
    return metadata.preferred_username.trim();
  }

  if (typeof user.email === 'string' && user.email.includes('@')) {
    const emailPrefix = user.email.split('@')[0];
    return emailPrefix || 'Anonymous';
  }

  return 'Anonymous';
};

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'You need to sign in before posting.',
    });
  }

  const ipAddress = getRequestIP(event, { xForwardedFor: true }) || 'unknown';
  const rateLimit = applyRateLimit(
    `guestbook:post:${user.id}:${ipAddress}`,
    5,
    10 * 60 * 1000
  );

  if (!rateLimit.allowed) {
    throw createError({
      statusCode: 429,
      statusMessage: `Rate limit reached. Please retry in ${rateLimit.retryAfterSeconds}s.`,
    });
  }

  const body = await readBody<GuestbookInsertBody>(event);
  const message = body.message?.trim() || '';

  if (message.length < 2 || message.length > 500) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Message must be between 2 and 500 characters.',
    });
  }

  const insertPayload = {
    user_id: user.id,
    user_name: getDisplayName(user),
    user_email: user.email || 'unknown@unknown.local',
    avatar_url: getAvatarUrl(user),
    message,
  };

  let { error } = await supabase
    .from('guestbook_entries')
    .insert(insertPayload);

  if (error?.code === '42703') {
    const legacyInsert = await supabase.from('guestbook_entries').insert({
      user_id: insertPayload.user_id,
      user_name: insertPayload.user_name,
      user_email: insertPayload.user_email,
      message: insertPayload.message,
    });

    error = legacyInsert.error;
  }

  if (error) {
    const statusCode = error.code === '42501' ? 403 : 500;

    throw createError({
      statusCode,
      statusMessage: error.message || 'Failed to post guestbook message.',
      data: {
        code: error.code,
        details: error.details,
        hint: error.hint,
      },
    });
  }

  return { success: true };
});
