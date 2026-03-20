<template>
  <div class="flex flex-col gap-16 pt-28 pb-24">
    <!-- ── Header ─────────────────────────────────────────── -->
    <Motion
      as="div"
      class="flex flex-col gap-3"
      :initial="{ opacity: 0, y: 24 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }"
    >
      <p class="font-pjs text-blue-400 text-sm tracking-widest uppercase">
        Let's connect
      </p>
      <h1
        class="font-pixel text-4xl md:text-6xl font-bold uppercase leading-tight"
      >
        Get In<br /><span class="text-blue-400">Touch</span>
      </h1>
      <p
        class="font-inter text-base text-white/50 max-w-lg leading-relaxed mt-2"
      >
        Want's some chitchat? or just want to say hello? Pick any platform below
        — I'm always happy to connect.
      </p>
    </Motion>

    <!-- ── Social cards grid ──────────────────────────────── -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Motion
        v-for="(social, i) in socials"
        :key="social.name"
        :as="social.discord ? 'button' : 'a'"
        v-bind="
          social.discord
            ? {}
            : {
                href: social.href,
                target: social.href.startsWith('mailto') ? '_self' : '_blank',
                rel: 'noopener noreferrer',
              }
        "
        class="social-card group w-full text-left"
        :style="{ '--accent': social.color }"
        :initial="{ opacity: 0, y: 32 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{
          duration: 0.5,
          delay: 0.1 + i * 0.07,
          ease: [0.22, 1, 0.36, 1],
        }"
        :whileHover="{ y: -6 }"
        @click="social.discord ? copyDiscord() : undefined"
      >
        <div class="card-icon-wrap relative">
          <UIcon :name="social.icon" class="text-2xl" />
          <span
            v-if="social.discord"
            class="status-dot"
            :style="{ background: STATUS_COLOR[discordStatus] }"
          />
        </div>

        <div class="flex-1 min-w-0">
          <p
            class="font-pjs font-semibold text-base text-white/90 leading-none mb-1"
          >
            {{ social.name }}
          </p>
          <p
            class="font-mono text-sm truncate transition-colors duration-200"
            :class="
              discordCopied && social.discord
                ? 'text-green-400'
                : 'text-white/40'
            "
          >
            {{ social.discord && discordCopied ? 'Copied!' : social.handle }}
          </p>

          <p
            v-if="social.discord"
            class="font-pjs text-xs mt-0.5 transition-colors duration-300"
            :style="{ color: STATUS_COLOR[discordStatus] }"
          >
            {{ STATUS_LABEL[discordStatus] }}
          </p>
        </div>

        <UIcon
          :name="
            social.discord
              ? discordCopied
                ? 'i-lucide-check'
                : 'i-lucide-copy'
              : 'i-lucide-arrow-up-right'
          "
          class="text-lg shrink-0 transition-colors duration-200"
          :class="
            social.discord
              ? discordCopied
                ? 'text-green-400'
                : 'text-white/30 group-hover:text-white/60'
              : 'text-white/20 group-hover:text-white/60'
          "
        />
      </Motion>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Contact ── Bintang Murtifandy',
  description: "Get in touch with Bintang Murtifandy — let's connect!",
  ogTitle: 'Contact ── Bintang Murtifandy',
  ogDescription: "Get in touch with Bintang Murtifandy — let's connect!",
  twitterTitle: 'Contact ── Bintang Murtifandy',
  twitterDescription: "Get in touch with Bintang Murtifandy — let's connect!",
});

const DISCORD_USER_ID = '1313127828119748664';
const DISCORD_TAG = 'byntangxyz_';

type DiscordStatus = 'online' | 'idle' | 'dnd' | 'offline';

const STATUS_COLOR: Record<DiscordStatus, string> = {
  online: '#22c55e',
  idle: '#f59e0b',
  dnd: '#ef4444',
  offline: '#6b7280',
};

const STATUS_LABEL: Record<DiscordStatus, string> = {
  online: 'Online',
  idle: 'Idle',
  dnd: 'Do Not Disturb',
  offline: 'Offline',
};

const { data: lanyard } = await useFetch<{
  success: boolean;
  data: { discord_status: DiscordStatus };
}>(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`, {
  server: false,
  key: `discord-${DISCORD_USER_ID}`,
  default: () => ({
    success: false,
    data: { discord_status: 'offline' as DiscordStatus },
  }),
});

const discordStatus = computed<DiscordStatus>(
  () => lanyard.value?.data?.discord_status ?? 'offline'
);

const discordCopied = ref(false);
let copyTimer: ReturnType<typeof setTimeout> | null = null;

const copyDiscord = async () => {
  await navigator.clipboard.writeText(DISCORD_TAG);
  discordCopied.value = true;
  if (copyTimer) clearTimeout(copyTimer);
  copyTimer = setTimeout(() => (discordCopied.value = false), 2000);
};

onUnmounted(() => {
  if (copyTimer) clearTimeout(copyTimer);
});

const socials = [
  {
    name: 'Email',
    handle: 'contact@bintangmurtifandy.id',
    href: 'mailto:contact@bintangmurtifandy.id',
    icon: 'i-lucide-mail',
    color: '#60a5fa',
    discord: false,
  },
  {
    name: 'GitHub',
    handle: '@byntangxyz',
    href: 'https://github.com/byntangxyz',
    icon: 'i-simple-icons-github',
    color: '#e2e8f0',
    discord: false,
  },
  {
    name: 'LinkedIn',
    handle: 'Bintang Murtifandy',
    href: 'https://www.linkedin.com/in/bintangmurtifandy/',
    icon: 'i-simple-icons-linkedin',
    color: '#0a66c2',
    discord: false,
  },
  {
    name: 'Youtube',
    handle: '@byntangxyzz',
    href: 'https://youtube.com/@byntangxyzz',
    icon: 'i-simple-icons-youtube',
    color: '#e7e9ea',
    discord: false,
  },
  {
    name: 'Instagram',
    handle: '@byntangxyz',
    href: 'https://instagram.com/byntangxyz',
    icon: 'i-simple-icons-instagram',
    color: '#e1306c',
    discord: false,
  },
  {
    name: 'Discord',
    handle: DISCORD_TAG,
    href: '',
    icon: 'i-simple-icons-discord',
    color: '#5865f2',
    discord: true,
  },
];
</script>

<style scoped>
.social-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(23, 37, 84, 0.35);
  backdrop-filter: blur(8px);
  cursor: pointer;
  text-decoration: none;
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease;
}

.social-card:hover {
  border-color: color-mix(in srgb, var(--accent) 40%, transparent);
  background: color-mix(in srgb, var(--accent) 6%, rgba(23, 37, 84, 0.5));
}

.card-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.625rem;
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  color: var(--accent);
  flex-shrink: 0;
  transition: background-color 0.25s ease;
}

.social-card:hover .card-icon-wrap {
  background: color-mix(in srgb, var(--accent) 22%, transparent);
}

.status-dot {
  position: absolute;
  bottom: -3px;
  right: -3px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  border: 2px solid rgb(15, 23, 42);
  transition: background-color 0.4s ease;
}
</style>
