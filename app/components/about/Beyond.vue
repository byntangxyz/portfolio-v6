<template>
  <section ref="beyondRef" class="relative">
    <Motion :style="{ y: beyondY }">
      <Motion
        as="div"
        class="bg-blue-950/40 border border-white/10 rounded-2xl p-8 md:p-10 flex flex-col gap-8"
        :initial="{ opacity: 0 }"
        :whileInView="{ opacity: 1 }"
        :viewport="{ once: true, margin: '-60px' }"
        :transition="{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }"
      >
        <div class="flex flex-col gap-3">
          <p class="font-pjs text-blue-400 text-sm tracking-widest uppercase">
            Outside the terminal
          </p>
          <h2
            class="font-pixel text-3xl md:text-4xl font-bold uppercase leading-tight"
          >
            Beyond Code
          </h2>
        </div>

        <div class="grid sm:grid-cols-2 gap-4">
          <Motion
            v-for="(item, i) in interests"
            :key="item.label"
            as="div"
            class="flex items-start gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/8"
            :initial="{ opacity: 0, y: 20 }"
            :whileInView="{ opacity: 1, y: 0 }"
            :viewport="{ once: true, margin: '-30px' }"
            :transition="{
              duration: 0.45,
              delay: i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }"
          >
            <div
              class="w-9 h-9 rounded-lg bg-blue-500/15 flex items-center justify-center shrink-0"
            >
              <UIcon :name="item.icon" class="text-blue-400 text-lg" />
            </div>
            <div class="flex flex-col gap-1 min-w-0">
              <p class="font-pjs font-semibold text-sm text-white/80">
                {{ item.label }}
              </p>
              <p class="font-inter text-xs text-white/40 leading-relaxed">
                {{ item.desc }}
              </p>
            </div>
          </Motion>
        </div>
      </Motion>
    </Motion>
  </section>
</template>

<script setup lang="ts">
import type { InterestItem } from '~/types/content';

const beyondRef = ref<HTMLElement | null>(null);
const beyondY = useElementParallax(beyondRef, {
  output: ['35px', '-35px'],
});

const interests: InterestItem[] = [
  {
    icon: 'i-lucide-music',
    label: 'Music',
    desc: 'Im listening to western pop genre music. But sometime Im listening lofi music while coding.',
  },
  {
    icon: 'i-lucide-gamepad-2',
    label: 'Gaming',
    desc: 'When tired, sometime Im playing adventure or fps games.',
  },
  {
    icon: 'i-lucide-pc-case',
    label: 'Tech Research',
    desc: 'Always reading about tech news especially on hardware solution.',
  },
];
</script>
