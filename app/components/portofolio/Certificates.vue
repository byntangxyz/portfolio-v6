<template>
  <section ref="sectionRef" class="relative flex flex-col gap-10">
    <Motion
      class="absolute -top-10 right-0 font-pixel font-bold uppercase leading-none select-none pointer-events-none text-[4rem] md:text-[6rem] text-white/[0.025]"
      :style="{ y: bgY }"
      aria-hidden="true"
    >
      CREDENTIALS
    </Motion>

    <Motion :style="{ y: contentY }">
      <Motion
        as="div"
        class="flex flex-col gap-3"
        :initial="{ opacity: 0, y: 24 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, margin: '-60px' }"
        :transition="{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }"
      >
        <p class="font-pjs text-blue-400 text-sm tracking-widest uppercase">
          Proof of learning
        </p>
        <h2
          class="font-pixel text-3xl md:text-4xl font-bold uppercase leading-tight"
        >
          Certificates
        </h2>
      </Motion>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        <Motion
          v-for="(cert, i) in certificates"
          :key="cert.title"
          as="div"
          :initial="{ opacity: 0, y: 32 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, margin: '-40px' }"
          :transition="{
            duration: 0.5,
            delay: i * 0.09,
            ease: [0.22, 1, 0.36, 1],
          }"
          :whileHover="{ y: -5 }"
        >
          <div
            class="group flex flex-col bg-blue-950/40 border border-white/10 hover:border-blue-500/30 transition-colors duration-300 rounded-xl overflow-hidden h-full"
          >
            <div
              class="relative w-full aspect-video overflow-hidden bg-blue-950/60 shrink-0"
            >
              <NuxtImg
                v-if="cert.image"
                :src="cert.image"
                :alt="cert.title"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div
                v-else
                class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-blue-950/80 to-blue-900/30"
              >
                <UIcon :name="cert.icon" class="text-blue-400/40 text-4xl" />
                <span
                  class="font-pjs text-xs text-white/20 tracking-widest uppercase"
                >
                  Certificate image
                </span>
              </div>
              <div class="absolute top-2.5 right-2.5">
                <UBadge
                  :label="cert.field"
                  color="info"
                  variant="soft"
                  size="sm"
                  class="font-pjs backdrop-blur-sm"
                />
              </div>
            </div>

            <div class="flex flex-col gap-2.5 p-5 flex-1">
              <div class="flex items-center gap-2.5">
                <div
                  class="w-7 h-7 rounded-md bg-blue-500/20 flex items-center justify-center shrink-0"
                >
                  <UIcon :name="cert.icon" class="text-blue-400 text-sm" />
                </div>
                <span
                  class="font-pjs text-xs text-white/35 tracking-widest uppercase"
                >
                  {{ cert.issuer }}
                </span>
              </div>

              <p
                class="font-pjs font-semibold text-sm text-white/85 leading-snug"
              >
                {{ cert.title }}
              </p>

              <span class="font-inter text-xs text-white/30 mt-auto pt-1">{{
                cert.date
              }}</span>
            </div>
          </div>
        </Motion>
      </div>
    </Motion>
  </section>
</template>

<script setup lang="ts">
import type { CertificateItem } from '~/types/content';

const sectionRef = ref<HTMLElement | null>(null);
const contentY = useElementParallax(sectionRef, {
  output: ['40px', '-40px'],
});
const bgY = useElementParallax(sectionRef, {
  output: ['60px', '-30px'],
});

const certificates: CertificateItem[] = [
  {
    title: 'Cisco Networking Academy — Introduction to Networks',
    issuer: 'Cisco',
    date: '2025',
    field: 'Networking',
    icon: 'i-lucide-network',
    image: '/certificates/cisco-intro-networks.webp',
  },
  {
    title: 'Junior Web Developer',
    issuer: 'BNSP',
    date: '2025',
    field: 'Web Dev',
    icon: 'i-lucide-code-2',
    image: '/certificates/bnsp-junior-webdev.webp',
  },
  {
    title: 'Cloud Practitioner Essentials',
    issuer: 'Dicoding',
    date: '2024',
    field: 'Cloud',
    icon: 'i-lucide-cloud',
    image: '/certificates/dicoding-cloud.webp',
  },
];
</script>
