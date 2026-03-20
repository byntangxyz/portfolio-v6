<template>
  <section ref="sectionRef" class="relative flex flex-col gap-10">
    <Motion
      class="absolute -top-10 -left-4 font-pixel font-bold uppercase leading-none select-none pointer-events-none text-[5rem] md:text-[7rem] text-white/[0.025]"
      :style="{ y: bgY }"
      aria-hidden="true"
    >
      PROJECTS
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
          Things I've built
        </p>
        <h2
          class="font-pixel text-3xl md:text-4xl font-bold uppercase leading-tight"
        >
          Projects
        </h2>
      </Motion>

      <Motion
        as="div"
        class="flex flex-wrap gap-2 mt-6"
        :initial="{ opacity: 0, y: 16 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, margin: '-40px' }"
        :transition="{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }"
      >
        <button
          v-for="cat in categories"
          :key="cat"
          class="font-pjs text-xs tracking-widest uppercase px-4 py-1.5 rounded-full border transition-all duration-200"
          :class="
            activeCategory === cat
              ? 'bg-blue-500/20 border-blue-500/50 text-blue-300'
              : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
          "
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </Motion>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <Motion
          v-for="(project, i) in filteredProjects"
          :key="project.title"
          as="div"
          class="h-full"
          :initial="{ opacity: 0, y: 44 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, margin: '-40px' }"
          :transition="{
            duration: 0.55,
            delay: i * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }"
          :whileHover="{ y: -6 }"
        >
          <div
            class="group h-full flex flex-col bg-blue-950/40 border border-white/10 hover:border-blue-500/40 transition-colors duration-300 rounded-xl overflow-hidden"
          >
            <div
              class="relative w-full aspect-video overflow-hidden bg-blue-950/60 shrink-0"
            >
              <NuxtImg
                v-if="project.image"
                :src="project.image"
                :alt="project.title"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                v-else
                class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-blue-950/80 to-blue-900/30"
              >
                <UIcon :name="project.icon" class="text-blue-400/50 text-4xl" />
                <span
                  class="font-pjs text-xs text-white/20 tracking-widest uppercase"
                >
                  Preview coming soon
                </span>
              </div>
              <div class="absolute top-2.5 right-2.5">
                <UBadge
                  :label="project.category"
                  color="info"
                  variant="soft"
                  size="sm"
                  class="font-pjs backdrop-blur-sm"
                />
              </div>
            </div>

            <!-- Card content -->
            <div class="flex flex-col gap-3 p-5 flex-1">
              <div class="flex items-start gap-2.5">
                <div
                  class="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5"
                >
                  <UIcon :name="project.icon" class="text-blue-400 text-base" />
                </div>
                <h3 class="font-pjs font-bold text-base leading-snug">
                  {{ project.title }}
                </h3>
              </div>

              <p class="font-inter text-sm text-white/50 leading-relaxed">
                {{ project.description }}
              </p>

              <div class="flex flex-wrap gap-1.5 mt-auto pt-1">
                <UBadge
                  v-for="tag in project.tags"
                  :key="tag"
                  :label="tag"
                  color="neutral"
                  variant="soft"
                  size="sm"
                  class="font-pjs"
                />
              </div>

              <div v-if="project.link" class="pt-1 border-t border-white/5">
                <UButton
                  :to="project.link"
                  target="_blank"
                  color="neutral"
                  variant="ghost"
                  size="sm"
                  class="font-pjs -ml-2"
                  trailing-icon="i-lucide-arrow-up-right"
                >
                  View Project
                </UButton>
              </div>
            </div>
          </div>
        </Motion>
      </div>
    </Motion>
  </section>
</template>

<script setup lang="ts">
import type { PortfolioProjectItem } from '~/types/content';

const sectionRef = ref<HTMLElement | null>(null);
const contentY = useElementParallax(sectionRef, {
  output: ['40px', '-40px'],
});
const bgY = useElementParallax(sectionRef, {
  output: ['80px', '-30px'],
});

const categories = ['All', 'Web', 'Infrastructure'];
const activeCategory = ref('All');

const projects: PortfolioProjectItem[] = [
  {
    title: 'Personal Portfolio',
    description:
      'My personal portfolio to show-off my work, skills and experience trough website.',
    tags: ['Nuxt', 'TailwindCSS', 'motion-v'],
    icon: 'i-lucide-panel-top',
    category: 'Web',
    link: '',
    image: '/projects/porto.webp',
  },
  {
    title: 'MERN Auth Template',
    description:
      'MERN or Mongodb Express React Nodejs stacks template with JWT authentication, role-based access control, and responsive design.',
    tags: ['JavaScript', 'Nodejs', 'React'],
    icon: 'i-lucide-layout-panel-top',
    category: 'Web',
    link: '',
    image: '/projects/mern-auth.webp',
  },
  {
    title: 'PVE Pakem',
    description:
      'A homelab server project I lead with my partner. Using Proxmox as the main hypervisor running multiple VMs and containers.',
    tags: ['Proxmox', 'Hypervisor', 'System Admin'],
    icon: 'i-lucide-server',
    category: 'Infrastructure',
    link: '',
    image: '/projects/pvepakem.webp',
  },
  {
    title: 'SIJA Arc Website v2',
    description: 'Website 28th SIJA A SMKN 2 Depok Sleman.',
    tags: ['NextJS', 'TailwindCSS', 'Framer Motion'],
    icon: 'i-lucide-panel-top',
    category: 'Web',
    link: '',
    image: '/projects/sijaarcv2.webp',
  },
  {
    title: 'HololiveId gen3 3D',
    description:
      'Hololive Indonesia gen3 3D model viewer built with React, featuring interactive animations and optimized performance.',
    tags: ['React', 'Animation', '3D'],
    icon: 'i-lucide-panel-top',
    category: 'Web',
    link: '',
    image: '/projects/holog3.webp',
  },
];

const filteredProjects = useCategoryFilter(projects, activeCategory);
</script>
