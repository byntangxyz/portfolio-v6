<template>
  <div
    class="mx-auto flex w-full max-w-5xl flex-col gap-14 px-4 pt-28 pb-24 sm:px-6"
  >
    <Motion
      as="section"
      class="flex flex-col gap-3"
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }"
    >
      <p class="font-pjs text-blue-400 text-sm tracking-widest uppercase">
        What do you think?
      </p>
      <h1
        class="font-pixel text-4xl md:text-6xl font-bold uppercase leading-tight"
      >
        Guest<br /><span class="text-blue-400">Book</span>
      </h1>
      <p
        class="font-inter text-base text-white/50 max-w-2xl leading-relaxed mt-2"
      >
        Leave your message, feedback, or just say hi! I appreciate every single note:)
      </p>
    </Motion>

    <Motion
      as="section"
      :initial="{ opacity: 0, y: 24 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }"
    >
      <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 class="font-pjs text-2xl font-semibold text-white">Messages</h2>
        <UBadge color="neutral" variant="soft">
          {{ entries.length }} total
        </UBadge>
      </div>

      <div v-if="user" class="post-menu mb-6">
        <div class="post-head mb-6 flex flex-wrap items-start justify-between gap-4">
          <div class="post-identity flex min-w-0 items-center gap-3">
            <UAvatar
              :src="currentUserAvatar || undefined"
              :alt="user.email || 'User avatar'"
              :text="getInitials(user.email || 'User')"
              size="lg"
            />
            <div class="min-w-0">
              <p class="truncate text-xl font-semibold text-white">
                {{ user.user_metadata?.full_name || user.user_metadata?.name || user.email }}
              </p>
              <p class="text-base text-white/55">Signed in</p>
            </div>
          </div>

          <div class="flex items-center">
            <UButton
              color="neutral"
              variant="solid"
              size="lg"
              class="post-signout cursor-pointer"
              :loading="isSigningOut"
              @click="signOut"
            >
              Sign out
            </UButton>
          </div>
        </div>

        <h3 class="mb-4 font-pjs text-lg md:text-xl font-semibold text-white">Leave a Message</h3>

        <div class="composer-shell">
          <UTextarea
            v-model="message"
            class="composer-input w-full"
            :rows="5"
            :max-length="500"
            :disabled="isSubmitting"
            placeholder="Write your message here..."
          />

          <div class="mt-3 flex items-center justify-between gap-3">
            <p class="text-sm text-white/55">{{ messageLength }}/500</p>
            <UButton
              size="lg"
              class="post-submit text-slate-300"
              :disabled="!canSubmit || isSubmitting"
              :loading="isSubmitting"
              @click="submitMessage"
              color="secondary"
            >
              Post Message
            </UButton>
          </div>
        </div>

        <UAlert
          v-if="submitError"
          class="mt-4"
          color="error"
          variant="soft"
          :title="submitError"
        />

        <UAlert
          v-if="submitSuccess"
          class="mt-4"
          color="success"
          variant="soft"
          :title="submitSuccess"
        />

        <UAlert
          v-if="deleteError"
          class="mt-4"
          color="error"
          variant="soft"
          :title="deleteError"
        />
      </div>

      <div v-if="entriesPending" class="py-2 text-sm text-muted">
        Loading guestbook entries...
      </div>

      <UAlert
        v-else-if="entriesError"
        color="error"
        variant="soft"
        title="Failed to load guestbook entries."
      />

      <div
        v-else-if="displayedEntries.length === 0"
        class="py-2 text-sm text-muted"
      >
        No messages yet. Be the first one.
      </div>

      <div v-else class="space-y-3">
        <article
          v-for="entry in displayedEntries"
          :key="entry.id"
          class="message-card"
        >
          <div class="mb-2 flex items-start justify-between gap-3">
            <div class="flex min-w-0 items-start gap-3">
              <UAvatar
                :src="entry.avatar_url || undefined"
                :alt="entry.user_name"
                :text="getInitials(entry.user_name)"
                size="2xl"
              />
              <div class="min-w-0">
                <p
                  class="text-base md:text-lg font-semibold text-highlighted truncate"
                >
                  {{ entry.user_name }}
                </p>
                <p class="text-sm text-muted">
                  {{ formatDate(entry.created_at) }}
                </p>
              </div>
            </div>

            <UButton
              v-if="canDelete(entry)"
              size="xs"
              color="error"
              variant="soft"
              icon="i-heroicons-trash"
              :loading="deletingEntryId === entry.id"
              :disabled="deletingEntryId === entry.id"
              @click="openDeleteModal(entry)"
            >
              Delete
            </UButton>
          </div>
          <p class="whitespace-pre-wrap text-base md:text-lg text-toned">
            {{ entry.message }}
          </p>
        </article>

        <div v-if="hasMoreEntries" class="pt-2 text-center">
          <UButton
            variant="outline"
            color="neutral"
            icon="i-heroicons-arrow-down"
            @click="showMore"
          >
            Show 5 more
          </UButton>
        </div>
      </div>
    </Motion>

    <Motion
      v-if="!user"
      as="section"
      class="auth-cta"
      :initial="{ opacity: 0, y: 24 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.45, delay: 0.16, ease: [0.22, 1, 0.36, 1] }"
    >
      <h2
        class="font-pjs text-center text-2xl sm:text-3xl font-semibold text-white"
      >
        Want to leave a message?
      </h2>

      <p class="mx-auto mt-3 max-w-3xl text-center text-base text-white/65">
        Sign in with Google or GitHub to share your thoughts and join the
        conversation.
      </p>

      <div class="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
        <UButton
          icon="i-simple-icons-github"
          size="xl"
          class="auth-btn cursor-pointer"
          color="neutral"
          :loading="loadingProvider === 'github'"
          :disabled="Boolean(loadingProvider)"
          @click="signIn('github')"
        >
          GitHub
        </UButton>
        <UButton
          icon="i-simple-icons-google"
          size="xl"
          class="auth-btn cursor-pointer"
          color="secondary"
          variant="soft"
          :loading="loadingProvider === 'google'"
          :disabled="Boolean(loadingProvider)"
          @click="signIn('google')"
        >
          Google
        </UButton>
      </div>

      <UAlert
        v-if="authError"
        class="mx-auto mt-4 max-w-xl"
        color="error"
        variant="soft"
        :title="authError"
      />
    </Motion>

    <UModal
      v-model:open="isDeleteModalOpen"
      title="Delete message"
      description="This action cannot be undone."
    >
      <template #body>
        <p class="text-sm text-muted">
          Are you sure you want to delete this message?
        </p>
      </template>
      <template #footer>
        <div class="flex w-full justify-end gap-2">
          <UButton color="neutral" variant="soft" @click="cancelDelete">
            Cancel
          </UButton>
          <UButton
            color="error"
            icon="i-heroicons-trash"
            :loading="isConfirmDeleting"
            :disabled="!deleteTarget || isConfirmDeleting"
            @click="confirmDelete"
          >
            Yes, delete
          </UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type { Provider } from '@supabase/supabase-js';

interface GuestbookEntry {
  id: string;
  user_id: string;
  user_name: string;
  avatar_url: string | null;
  message: string;
  created_at: string;
}

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const currentUserId = ref<string | null>(user.value?.id || null);

const loadingProvider = ref<Provider | null>(null);
const isSigningOut = ref(false);
const authError = ref('');
const message = ref('');
const isSubmitting = ref(false);
const submitError = ref('');
const submitSuccess = ref('');
const deleteError = ref('');
const deletingEntryId = ref<string | null>(null);
const isDeleteModalOpen = ref(false);
const deleteTarget = ref<GuestbookEntry | null>(null);
const isConfirmDeleting = ref(false);

const {
  data: entries,
  pending: entriesPending,
  error: entriesError,
  refresh: refreshEntries,
} = await useFetch<GuestbookEntry[]>('/api/guestbook', {
  default: () => [],
});

const visibleEntriesCount = ref(5);
const displayedEntries = computed(() =>
  entries.value.slice(0, visibleEntriesCount.value)
);
const hasMoreEntries = computed(
  () => entries.value.length > visibleEntriesCount.value
);

const currentUserAvatar = computed(() => {
  const metadata = user.value?.user_metadata as
    | { avatar_url?: string; picture?: string }
    | undefined;

  return metadata?.avatar_url || metadata?.picture || null;
});

const messageLength = computed(() => message.value.trim().length);
const canSubmit = computed(
  () =>
    Boolean(currentUserId.value) &&
    messageLength.value >= 2 &&
    messageLength.value <= 500
);

const canDelete = (entry: GuestbookEntry) =>
  Boolean(currentUserId.value && currentUserId.value === entry.user_id);

const showMore = () => {
  visibleEntriesCount.value += 5;
};

watch(
  () => user.value?.id || null,
  async (id) => {
    currentUserId.value = id;
    await refreshEntries();
  }
);

let authSubscription: { unsubscribe: () => void } | null = null;

onMounted(() => {
  const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
    currentUserId.value = session?.user?.id || null;
    await refreshEntries();
  });

  authSubscription = data.subscription;
});

onUnmounted(() => {
  authSubscription?.unsubscribe();
});

const signIn = async (provider: Provider) => {
  authError.value = '';
  loadingProvider.value = provider;

  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/guestbook`,
    },
  });

  if (error) {
    authError.value = error.message;
    loadingProvider.value = null;
  }
};

const signOut = async () => {
  authError.value = '';
  isSigningOut.value = true;

  const { error } = await supabase.auth.signOut();

  if (error) {
    authError.value = error.message;
  }

  currentUserId.value = null;
  await refreshEntries();

  isSigningOut.value = false;
};

const submitMessage = async () => {
  submitError.value = '';
  submitSuccess.value = '';
  deleteError.value = '';

  if (!user.value) {
    submitError.value = 'Please sign in before posting a message.';
    return;
  }

  const payload = message.value.trim();

  if (payload.length < 2 || payload.length > 500) {
    submitError.value = 'Message must be between 2 and 500 characters.';
    return;
  }

  isSubmitting.value = true;

  try {
    await $fetch<{ success: boolean }>('/api/guestbook', {
      method: 'POST',
      body: {
        message: payload,
      },
    });

    await refreshEntries();
    visibleEntriesCount.value = Math.max(5, visibleEntriesCount.value);
    message.value = '';
    submitSuccess.value = 'Your message has been posted.';
  } catch (error) {
    if (typeof error === 'object' && error && 'data' in error) {
      const fetchError = error as {
        statusMessage?: string;
        data?: { statusMessage?: string; message?: string };
      };

      submitError.value =
        fetchError.data?.statusMessage ||
        fetchError.data?.message ||
        fetchError.statusMessage ||
        'Failed to post message.';
    } else {
      submitError.value =
        error instanceof Error ? error.message : 'Failed to post message.';
    }
  } finally {
    isSubmitting.value = false;
  }
};

const deleteMessage = async (id: string) => {
  submitError.value = '';
  submitSuccess.value = '';
  deleteError.value = '';
  deletingEntryId.value = id;

  try {
    await $fetch<{ success: boolean }>(`/api/guestbook/${id}`, {
      method: 'DELETE',
    });

    entries.value = entries.value.filter((entry) => entry.id !== id);
    visibleEntriesCount.value = Math.max(5, visibleEntriesCount.value - 1);
    submitSuccess.value = 'Message deleted.';
  } catch (error) {
    if (typeof error === 'object' && error && 'data' in error) {
      const fetchError = error as {
        statusMessage?: string;
        data?: { statusMessage?: string; message?: string };
      };

      deleteError.value =
        fetchError.data?.statusMessage ||
        fetchError.data?.message ||
        fetchError.statusMessage ||
        'Failed to delete message.';
    } else {
      deleteError.value =
        error instanceof Error ? error.message : 'Failed to delete message.';
    }
  } finally {
    deletingEntryId.value = null;
  }
};

const openDeleteModal = (entry: GuestbookEntry) => {
  deleteTarget.value = entry;
  isDeleteModalOpen.value = true;
};

const cancelDelete = () => {
  isDeleteModalOpen.value = false;
  deleteTarget.value = null;
};

const confirmDelete = async () => {
  if (!deleteTarget.value) {
    return;
  }

  isConfirmDeleting.value = true;
  await deleteMessage(deleteTarget.value.id);
  isConfirmDeleting.value = false;
  isDeleteModalOpen.value = false;
  deleteTarget.value = null;
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('') || 'U';

const runtimeConfig = useRuntimeConfig();
const siteUrl = (runtimeConfig.public.siteUrl || 'https://bintangmurtifandy.id')
  .replace(/\/$/, '');
const guestbookUrl = `${siteUrl}/guestbook`;

useSeoMeta({
  title: 'Guestbook - Bintang Murtifandy',
  description: 'Sign my guestbook and leave your message.',
  ogTitle: 'Guestbook - Bintang Murtifandy',
  ogDescription: 'Sign my guestbook and leave your message.',
  ogUrl: guestbookUrl,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Guestbook - Bintang Murtifandy',
  twitterDescription: 'Sign my guestbook and leave your message.',
  robots: 'index,follow',
});

useHead({
  link: [{ rel: 'canonical', href: guestbookUrl }],
});
</script>

<style scoped>
.message-card {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.75rem;
  padding: 1.5rem;
  background: transparent;
}

.post-menu {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.02);
}

.composer-shell {
  border: 0;
  border-radius: 0;
  padding: 0;
  background: transparent;
}

:deep(.composer-input textarea) {
  width: 100%;
  min-height: 10.5rem;
  border-radius: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.25);
  background: rgba(2, 6, 23, 0.35);
  color: #e5e7eb;
  font-size: 1rem;
  line-height: 1.5;
  padding: 1rem 1.2rem;
  resize: none;
}

:deep(.composer-input textarea:focus) {
  outline: none;
  box-shadow: none;
  border-color: rgba(148, 163, 184, 0.6);
}

:deep(.composer-input textarea::placeholder) {
  color: rgba(203, 213, 225, 0.7);
}

:deep(.composer-input) {
  width: 100%;
  display: block;
}

.post-submit {
  min-width: 11rem;
  justify-content: center;
}

.post-signout {
  min-width: 9.5rem;
  justify-content: center;
}

.auth-cta {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 1rem;
  padding: 1.5rem 1rem;
  background: transparent;
}

.auth-btn {
  min-width: 9rem;
  justify-content: center;
}

@media (max-width: 768px) {
  .message-card {
    padding: 1rem;
  }

  .composer-shell {
    padding: 0;
  }

  :deep(.composer-input textarea) {
    min-height: 8rem;
    font-size: 1rem;
    padding: 0.875rem 1rem;
  }

  .post-menu {
    padding: 1rem;
  }

  .post-submit {
    min-width: 11rem;
  }

  .auth-cta {
    padding: 1.25rem 0.875rem;
  }
}
</style>
