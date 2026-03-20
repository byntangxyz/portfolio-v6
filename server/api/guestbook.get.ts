import { serverSupabaseClient } from '#supabase/server';

interface GuestbookEntry {
  id: string;
  user_id: string;
  user_name: string;
  avatar_url: string | null;
  message: string;
  created_at: string;
}

interface GuestbookEntryResponse {
  id: string;
  user_id: string;
  user_name: string;
  avatar_url: string | null;
  message: string;
  created_at: string;
}

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  let { data, error } = await supabase
    .from('guestbook_entries')
    .select('id, user_id, user_name, avatar_url, message, created_at')
    .order('created_at', { ascending: false })
    .limit(100);

  // Backward compatibility if avatar column has not been added yet.
  if (error?.code === '42703') {
    const legacyResult = await supabase
      .from('guestbook_entries')
      .select('id, user_id, user_name, message, created_at')
      .order('created_at', { ascending: false })
      .limit(100);

    data = legacyResult.data?.map((entry) => ({
      ...entry,
      avatar_url: null,
    })) as GuestbookEntry[] | null;
    error = legacyResult.error;
  }

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load guestbook entries',
      data: error.message,
    });
  }

  return ((data || []) as GuestbookEntry[]).map((entry) => ({
    id: entry.id,
    user_id: entry.user_id,
    user_name: entry.user_name,
    avatar_url: entry.avatar_url,
    message: entry.message,
    created_at: entry.created_at,
  })) as GuestbookEntryResponse[];
});
