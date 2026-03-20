<template>
  <div class="relative overflow-hidden">
    <Motion
      class="absolute -top-4 -right-4 font-pixel font-bold uppercase leading-none select-none pointer-events-none text-[7rem] md:text-[10rem] text-blue-500/5"
      :style="{ y: headerBgY }"
      aria-hidden="true"
    >
      WORK
    </Motion>

    <Motion
      as="div"
      class="relative flex flex-col gap-3"
      :initial="{ opacity: 0, y: 24 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }"
    >
      <p class="font-pjs text-blue-400 text-sm tracking-widest uppercase">
        What I've been building
      </p>
      <h1
        class="font-pixel text-4xl md:text-6xl font-bold uppercase leading-tight"
      >
        My<br /><span class="text-blue-400">Portfolio</span>
      </h1>
      <p
        class="font-inter text-base text-white/50 max-w-lg leading-relaxed mt-2"
      >
        A collection of projects, credentials, and experiences that define the
        work I do.
      </p>
    </Motion>
  </div>
</template>

<script setup lang="ts">
const headerBgY = usePageParallax({ output: ['0px', '-80px'] });
</script>
