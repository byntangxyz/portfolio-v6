import { serverSupabaseClient } from '#supabase/server';
import { getRouterParam, getRequestIP } from 'h3';
import { applyRateLimit } from '../../utils/rate-limit';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') || '';

  if (!UUID_REGEX.test(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid guestbook entry id.',
    });
  }

  const supabase = await serverSupabaseClient(event);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'You need to sign in before deleting.',
    });
  }

  const ipAddress = getRequestIP(event, { xForwardedFor: true }) || 'unknown';
  const rateLimit = applyRateLimit(
    `guestbook:delete:${user.id}:${ipAddress}`,
    20,
    10 * 60 * 1000
  );

  if (!rateLimit.allowed) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many delete requests. Please retry in ${rateLimit.retryAfterSeconds}s.`,
    });
  }

  const { error } = await supabase
    .from('guestbook_entries')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    const statusCode = error.code === '42501' ? 403 : 500;

    throw createError({
      statusCode,
      statusMessage: error.message || 'Failed to delete guestbook message.',
      data: {
        code: error.code,
        details: error.details,
        hint: error.hint,
      },
    });
  }

  return { success: true };
});
