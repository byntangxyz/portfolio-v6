<template>
  <div class="flex flex-col gap-28 pt-28 pb-24">
    <div class="relative overflow-hidden">
      <Motion
        class="absolute -top-4 -right-4 font-pixel font-bold uppercase leading-none select-none pointer-events-none text-[7rem] md:text-[10rem] text-blue-500/5"
        :style="{ y: headerBgY }"
        aria-hidden="true"
      >
        ABOUT
      </Motion>

      <Motion
        as="div"
        class="relative flex flex-col gap-3"
        :initial="{ opacity: 0, y: 24 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }"
      >
        <p class="font-pjs text-blue-400 text-sm tracking-widest uppercase">
          A bit about me
        </p>
        <h1
          class="font-pixel text-4xl md:text-6xl font-bold uppercase leading-tight"
        >
          Get To<br /><span class="text-blue-400">Know Me</span>
        </h1>
        <p
          class="font-inter text-base text-white/50 max-w-lg leading-relaxed mt-2"
        >
          Fullstack developer, devops, network engineer, and tech enthusiast.
        </p>
      </Motion>
    </div>

    <section ref="bioRef" class="relative">
      <Motion
        class="absolute -top-10 -left-4 font-pixel font-bold uppercase leading-none select-none pointer-events-none text-[5rem] md:text-[7rem] text-white/[0.03]"
        :style="{ y: bioBgY }"
        aria-hidden="true"
      >
        STORY
      </Motion>

      <Motion :style="{ y: bioCardY }">
        <Motion
          as="div"
          class="group relative bg-blue-950/40 border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row"
          :initial="{ opacity: 0 }"
          :whileInView="{ opacity: 1 }"
          :viewport="{ once: true, margin: '-60px' }"
          :transition="{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }"
        >
          <div class="flex-1 flex flex-col gap-6 p-8 md:p-12 cursor-crosshair">
            <p class="font-pjs text-blue-400 text-sm tracking-widest uppercase">
              My story
            </p>
            <div
              class="flex flex-col gap-4 font-inter text-base text-white/55 leading-relaxed"
            >
              <p>
                Hey, I'm
                <span class="text-white/90 font-semibold"
                  >Bintang Murtifandy</span
                >
                — a self-driven student who fell in love with building things on
                the web. What started as curiosity about Javascript gradually
                grew into a full-stack journey covering backend services,
                databases, and application architecture.
              </p>
              <p>
                These days I'm expanding beyond technology, diving deep into
                DevOps and Network Engineering. Combining all of that, make me
                realize that everythings are correlated. I can build the web,
                creating its infrastructure, and deploy it.
              </p>
              <p>
                My approach:
                <em class="font-mono not-italic text-blue-400"
                  >"Never stop learning and keep it slow"</em
                >
                — take time to truly understand something, rather than rushing
                to the next thing.
              </p>
            </div>
          </div>
          <div
            class="relative w-full h-64 md:w-72 md:h-auto shrink-0 cursor-crosshair"
          >
            <NuxtImg
              src="/me.webp"
              alt="Bintang Murtifandy"
              width="400"
              height="600"
              class="absolute inset-0 w-full h-full object-cover grayscale transition-[filter] duration-500 ease-in-out group-hover:grayscale-0"
            />
          </div>
        </Motion>
      </Motion>
    </section>

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

    <!-- ── Beyond Code ────────────────────────────────────── -->
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
  </div>
</template>

<script setup lang="ts">
import type { InterestItem, TimelineItem } from '~/types/content';

useSeoMeta({
  title: 'About ── Bintang Murtifandy',
  description:
    'Fullstack developer, network engineer, and tech enthusiast. Learn more about Bintang Murtifandy.',
  ogTitle: 'About ── Bintang Murtifandy',
  ogDescription:
    'Fullstack developer, network engineer, and tech enthusiast. Learn more about Bintang Murtifandy.',
  twitterTitle: 'About ── Bintang Murtifandy',
  twitterDescription:
    'Fullstack developer, network engineer, and tech enthusiast. Learn more about Bintang Murtifandy.',
});

const headerBgY = usePageParallax({ output: ['0px', '-90px'] });

const bioRef = ref<HTMLElement | null>(null);
const bioCardY = useElementParallax(bioRef, {
  output: ['40px', '-40px'],
});
const bioBgY = useElementParallax(bioRef, {
  output: ['100px', '-30px'],
});

const journeyRef = ref<HTMLElement | null>(null);
const journeyY = useElementParallax(journeyRef, {
  output: ['50px', '-30px'],
});

const beyondRef = ref<HTMLElement | null>(null);
const beyondY = useElementParallax(beyondRef, {
  output: ['35px', '-35px'],
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
    year: '2024',
    title: 'Stack Exploration',
    description:
      'Studying trough framework: react, vue, nextjs, and nuxt by myself from some course.',
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
    icon: 'i-lucide-rss',
    label: 'Tech Research',
    desc: 'Always reading about tech news especially on hardware solution.',
  },
];
</script>
