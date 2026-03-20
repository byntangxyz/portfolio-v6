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
        What I work with
      </p>
      <h2 class="font-pixel text-3xl md:text-4xl font-bold uppercase">
        Tech Stack
      </h2>
    </Motion>

    <div class="flex flex-wrap gap-3">
      <Motion
        v-for="(skill, i) in skills"
        :key="skill"
        as="div"
        :initial="{ opacity: 0, scale: 0.8, y: 10 }"
        :whileInView="{ opacity: 1, scale: 1, y: 0 }"
        :viewport="{ once: true, margin: '-20px' }"
        :transition="{ duration: 0.35, delay: i * 0.055, ease: 'easeOut' }"
        :whileHover="{ scale: 1.1, y: -3 }"
      >
        <UBadge
          :label="skill"
          size="lg"
          color="neutral"
          variant="soft"
          class="font-pjs text-sm px-4 py-1.5 cursor-crosshair"
        />
      </Motion>
    </div>
  </section>
</template>

<script setup lang="ts">
const skills: string[] = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Vue',
  'Nuxt',
  'Go',
  'Tailwind CSS',
];
</script>
