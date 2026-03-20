<template>
  <Motion
    as="div"
    class="fixed top-0 inset-x-0 z-50"
    :initial="{ y: -80, opacity: 0 }"
    :animate="{ y: 0, opacity: 1 }"
    :transition="{ type: 'tween', duration: 0.5, ease: [0.22, 1, 0.36, 1] }"
  >
    <UHeader
      :class="[
        'px-3 sm:px-4 md:px-6 backdrop-blur-lg rounded-xl transition-all duration-300',
        isScrolled
          ? 'bg-blue-950/70 py-1.5 m-2 md:mx-12 md:my-1.5 shadow-md shadow-blue-950/40'
          : 'bg-blue-950/40 py-3 m-4 md:mx-12 md:my-3',
      ]"
      :ui="{ toggle: 'hidden' }"
    >
      <template #title>
        <Motion
          as="div"
          class="flex items-center"
          :initial="{ opacity: 0, x: -16 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ delay: 0.2, duration: 0.4, ease: 'easeOut' }"
        >
          <NuxtLink to="/" class="-ml-3 flex items-center gap-2">
            <NuxtImg
              src="/logo.png"
              alt="BMurtifandy Logo"
              width="32"
              height="32"
              class="rounded-full md:mr-2"
            />
            <h3 class="font-pixel font-bold text-2xl md:text-3xl uppercase">
              BMurtifandy
            </h3>
          </NuxtLink>
        </Motion>
      </template>

      <template #right>
        <!-- Desktop nav -->
        <Motion
          as="div"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :transition="{ delay: 0.3, duration: 0.4, ease: 'easeOut' }"
        >
          <UNavigationMenu
            :items="navLinks"
            color="neutral"
            class="font-pjs text-xl hidden md:flex"
          />
        </Motion>

        <Motion
          as="div"
          class="flex items-center gap-1"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :transition="{ delay: 0.42, duration: 0.35, ease: 'easeOut' }"
        >
          <UTooltip text="Open on GitHub" :kbds="['meta', 'M']">
            <UButton
              color="neutral"
              variant="ghost"
              to="https://github.com/byntangxyz"
              target="_blank"
              icon="i-simple-icons-github"
              aria-label="GitHub"
            />
          </UTooltip>

          <UButton
            class="md:hidden"
            color="neutral"
            variant="ghost"
            :icon="isNavOpen ? 'i-lucide-x' : 'i-lucide-menu'"
            aria-label="Toggle navigation"
            @click="isNavOpen = !isNavOpen"
          />
        </Motion>
      </template>
    </UHeader>
  </Motion>

  <!-- Mobile nav-->
  <Teleport to="body">
    <AnimatePresence>
      <template v-if="isNavOpen">
        <Motion
          key="nav-backdrop"
          as="div"
          class="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :transition="{ duration: 0.25, ease: 'easeInOut' }"
          @click="isNavOpen = false"
        />

        <!-- Panel -->
        <Motion
          key="nav-panel"
          as="nav"
          class="fixed inset-x-3 sm:inset-x-4 top-20 sm:top-24 z-[9999] bg-blue-950/95 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-5 shadow-2xl shadow-black/50"
          :initial="{ opacity: 0, scale: 0.95, y: -12 }"
          :animate="{ opacity: 1, scale: 1, y: 0 }"
          :exit="{ opacity: 0, scale: 0.95, y: -8 }"
          :transition="{ type: 'spring', stiffness: 340, damping: 32 }"
        >
          <div
            class="flex items-center justify-between mb-4 pb-3 border-b border-white/10"
          >
            <span class="font-pixel font-bold text-lg uppercase text-white/70"
              >Navigation</span
            >
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-x"
              size="sm"
              @click="isNavOpen = false"
            />
          </div>
          <ul class="flex flex-col gap-1">
            <Motion
              v-for="(link, index) in navLinks"
              :key="link.label"
              as="li"
              :initial="{ opacity: 0, x: -10 }"
              :animate="{ opacity: 1, x: 0 }"
              :transition="{
                delay: 0.05 + index * 0.055,
                type: 'spring',
                stiffness: 340,
                damping: 30,
              }"
            >
              <NuxtLink
                :to="link.to"
                class="flex items-center px-4 py-3 rounded-xl font-pjs text-lg hover:bg-white/10 transition-colors duration-200"
                active-class="bg-white/10 text-white"
                @click="isNavOpen = false"
              >
                {{ link.label }}
              </NuxtLink>
            </Motion>
          </ul>
        </Motion>
      </template>
    </AnimatePresence>
  </Teleport>
</template>

<script setup lang="ts">
import { AnimatePresence } from 'motion-v';
import type { NavigationMenuItem } from '@nuxt/ui';

const navLinks = computed<NavigationMenuItem[]>(() => [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Portofolio', to: '/portofolio' },
  { label: 'GuestBook', to: '/guestbook' },
  { label: 'Contact', to: '/contact' },
]);

const isScrolled = ref(false);
const isNavOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

useWindowEvent('scroll', handleScroll, { passive: true });
</script>
