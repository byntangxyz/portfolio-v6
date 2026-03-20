<template>
  <section ref="journeyRef" class="relative">
    <Motion :style="{ y: journeyY }">
      <div class="flex flex-col gap-10">
        <Motion
          as="div"
          class="flex flex-col gap-3"
          :initial="{ opacity: 0 }"
          :whileInView="{ opacity: 1 }"
          :viewport="{ once: true, margin: '-60px' }"
          :transition="{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }"
        >
          <p class="font-pjs text-blue-400 text-sm tracking-widest uppercase">
            How I got here
          </p>
          <h2
            class="font-pixel text-3xl md:text-4xl font-bold uppercase leading-tight"
          >
            Learning Journey
          </h2>
        </Motion>

        <div class="relative flex flex-col pl-6 md:pl-8">
          <div
            class="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-blue-400/30 via-white/10 to-transparent"
          />

          <Motion
            v-for="(item, i) in timeline"
            :key="item.year"
            as="div"
            class="relative flex flex-col gap-1 pb-10 last:pb-0"
            :initial="{ opacity: 0, x: -24 }"
            :whileInView="{ opacity: 1, x: 0 }"
            :viewport="{ once: true, margin: '-40px' }"
            :transition="{
              duration: 0.5,
              delay: i * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }"
          >
            <div
              class="absolute -left-[1.65rem] md:-left-[2.15rem] top-[0.35rem] w-3 h-3 rounded-full bg-blue-400 ring-4 ring-blue-400/15"
            />

            <span
              class="font-pjs text-blue-400 text-xs tracking-widest uppercase"
            >
              {{ item.year }}
            </span>
            <p
              class="font-pixel text-lg font-bold uppercase text-white/85 leading-snug"
            >
              {{ item.title }}
            </p>
            <p
              class="font-inter text-sm text-white/45 leading-relaxed max-w-lg"
            >
              {{ item.description }}
            </p>
          </Motion>
        </div>
      </div>
    </Motion>
  </section>
</template>

<script setup lang="ts">
import type { TimelineItem } from '~/types/content';

const journeyRef = ref<HTMLElement | null>(null);
const journeyY = useElementParallax(journeyRef, {
  output: ['50px', '-30px'],
});

const timeline: TimelineItem[] = [
  {
    year: '2022',
    title: 'Started the Journey',
    description:
      'Discovered Javascript — built my first discord bot and immediately got hooked on creating things from nothing.',
  },
  {
    year: '2024',
    title: 'Jump to Stembayo',
    description:
      'Join SMKN 2 Depok Sleman to deepen my web development skills, learning everything from frontend frameworks to backend architecture and databases.',
  },
  {
    year: '2025',
    title: 'Networking & Infrastructure',
    description:
      'Started exploring networking fundamentals: protocols, routing, switching, and infrastructure architecture.',
  },
  {
    year: 'Now',
    title: 'Building & Growing',
    description:
      'Actively looking for opportunities to contribute and collaborate. Every day is a chance to learn something new.',
  },
];
</script>
