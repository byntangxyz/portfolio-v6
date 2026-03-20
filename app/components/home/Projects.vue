<template>
  <section class="flex flex-col gap-8">
    <Motion
      as="div"
      :initial="{ opacity: 0, y: 32 }"
      :whileInView="{ opacity: 1, y: 0 }"
      :viewport="{ once: true, margin: '-60px' }"
      :transition="{ duration: 0.5, ease: 'easeOut' }"
    >
      <p class="font-pjs text-blue-400 text-sm tracking-widest uppercase mb-2">
        What I've built
      </p>
      <h2 class="font-pixel text-3xl md:text-4xl font-bold uppercase">
        Featured Projects
      </h2>
    </Motion>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Motion
        v-for="(project, i) in projects"
        :key="project.title"
        as="div"
        class="h-full"
        :initial="{ opacity: 0, y: 44 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, margin: '-40px' }"
        :transition="{
          duration: 0.55,
          delay: i * 0.13,
          ease: [0.22, 1, 0.36, 1],
        }"
        :whileHover="{ y: -8 }"
      >
        <UCard
          class="h-full bg-blue-950/40 border border-white/10 hover:border-blue-500/40 transition-colors duration-300"
        >
          <div class="flex flex-col gap-4">
            <div
              class="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center"
            >
              <UIcon :name="project.icon" class="text-blue-400 text-xl" />
            </div>
            <div>
              <h3 class="font-pjs font-bold text-lg">{{ project.title }}</h3>
              <p
                class="font-inter text-sm text-white/50 mt-1.5 leading-relaxed"
              >
                {{ project.description }}
              </p>
            </div>
            <div class="flex flex-wrap gap-2 mt-auto pt-2">
              <UBadge
                v-for="tag in project.tags"
                :key="tag"
                :label="tag"
                color="info"
                variant="soft"
                size="sm"
                class="font-pjs"
              />
            </div>
          </div>
        </UCard>
      </Motion>
    </div>

    <Motion
      as="div"
      class="flex justify-center"
      :initial="{ opacity: 0 }"
      :whileInView="{ opacity: 1 }"
      :viewport="{ once: true }"
      :transition="{ duration: 0.5, delay: 0.25 }"
    >
      <UButton
        to="/portofolio"
        color="neutral"
        variant="outline"
        class="font-pjs"
        trailing-icon="i-lucide-arrow-right"
      >
        View All Projects
      </UButton>
    </Motion>
  </section>
</template>

<script setup lang="ts">
import type { HomeProjectItem } from '~/types/content';

const projects: HomeProjectItem[] = [
  {
    title: 'NEGSAS Website',
    description:
      'School website for SMPN 1 Sanden that I built using NextJS for frontend and Strapi for blog and content management',
    tags: ['NextJS', 'TypeScript', 'Tailwind CSS', 'Strapi'],
    icon: 'i-lucide-code-2',
  },
  {
    title: 'PVE Pakem',
    description:
      "I'm leading a project with my partner to setup a server as our homelab. We are using proxmox as our main hypervisor and we are running multiple VMs and containers.",
    tags: ['System Administrator', 'Hypervisor', 'Proxmox'],
    icon: 'i-lucide-server',
  },
  {
    title: 'Personal Homelab',
    description:
      'Im currently building my personal homelab to learn more about network engineering and infrastructure.',
    tags: ['System Administrator', 'Homelab', 'Network Engineering'],
    icon: 'i-lucide-house',
  },
];
</script>
