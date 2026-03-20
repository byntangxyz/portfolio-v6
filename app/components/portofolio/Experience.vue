<template>
  <section ref="sectionRef" class="relative">
    <Motion :style="{ y: contentY }">
      <div class="flex flex-col gap-10">
        <Motion
          as="div"
          class="flex flex-col gap-3"
          :initial="{ opacity: 0, y: 24 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, margin: '-60px' }"
          :transition="{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }"
        >
          <p class="font-pjs text-blue-400 text-sm tracking-widest uppercase">
            Where I've been
          </p>
          <h2
            class="font-pixel text-3xl md:text-4xl font-bold uppercase leading-tight"
          >
            Experience
          </h2>
        </Motion>

        <div class="relative flex flex-col pl-6 md:pl-8">
          <div
            class="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-blue-400/30 via-white/10 to-transparent"
          />

          <Motion
            v-for="(item, i) in experiences"
            :key="item.title"
            as="div"
            class="relative flex flex-col gap-1.5 pb-10 last:pb-0"
            :initial="{ opacity: 0, x: -24 }"
            :whileInView="{ opacity: 1, x: 0 }"
            :viewport="{ once: true, margin: '-40px' }"
            :transition="{
              duration: 0.5,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }"
          >
            <div
              class="absolute -left-[1.65rem] md:-left-[2.15rem] top-[0.35rem] w-3 h-3 rounded-full bg-blue-400 ring-4 ring-blue-400/15 transition-colors duration-300"
              :class="item.current ? 'ring-blue-400/30 animate-pulse' : ''"
            />

            <div class="flex flex-wrap items-center gap-2">
              <span
                class="font-pjs text-blue-400 text-xs tracking-widest uppercase"
              >
                {{ item.period }}
              </span>
              <UBadge
                v-if="item.current"
                label="Current"
                color="success"
                variant="soft"
                size="sm"
                class="font-pjs"
              />
            </div>

            <p
              class="font-pixel text-lg font-bold uppercase text-white/85 leading-snug"
            >
              {{ item.title }}
            </p>
            <p class="font-pjs text-sm text-blue-300/70 font-medium">
              {{ item.company }}
            </p>
            <p
              class="font-inter text-sm text-white/40 leading-relaxed max-w-xl mt-0.5"
            >
              {{ item.description }}
            </p>

            <div v-if="item.skills?.length" class="flex flex-wrap gap-1.5 mt-2">
              <UBadge
                v-for="skill in item.skills"
                :key="skill"
                :label="skill"
                color="neutral"
                variant="soft"
                size="sm"
                class="font-pjs"
              />
            </div>
          </Motion>
        </div>
      </div>
    </Motion>
  </section>
</template>

<script setup lang="ts">
import type { ExperienceItem } from '~/types/content';

const sectionRef = ref<HTMLElement | null>(null);
const contentY = useElementParallax(sectionRef, {
  output: ['50px', '-35px'],
});

const experiences: ExperienceItem[] = [
  {
    period: '2024 - Present',
    title: 'Student Developer',
    company: 'SMKN 2 Depok Sleman',
    description: 'Studying Sistem Informasi Jaringan dan Aplikasi (SIJA).',
    skills: [
      'System Administrator',
      'Web Development',
      'Network Engineering',
      'Cloud Computing',
    ],
    current: true,
  },
];
</script>
