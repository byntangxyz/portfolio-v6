<template>
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
              the web. What started as curiosity about Javascript gradually grew
              into a full-stack journey covering backend services, databases,
              and application architecture.
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
              — take time to truly understand something, rather than rushing to
              the next thing.
            </p>
          </div>
        </div>

        <!-- Image side — bleeds flush, no padding -->
        <!-- Mobile: natural aspect ratio (no crop) | Desktop: fills right panel -->
        <div class="w-full md:relative md:w-72 shrink-0 cursor-crosshair">
          <NuxtImg
            src="/me.webp"
            alt="Bintang Murtifandy"
            width="400"
            height="600"
            class="w-full block md:absolute md:inset-0 md:h-full object-cover grayscale transition-[filter] duration-500 ease-in-out group-hover:grayscale-0"
          />
        </div>
      </Motion>
    </Motion>
  </section>
</template>

<script setup lang="ts">
const bioRef = ref<HTMLElement | null>(null);
const bioCardY = useElementParallax(bioRef, {
  output: ['40px', '-40px'],
});
const bioBgY = useElementParallax(bioRef, {
  output: ['100px', '-30px'],
});
</script>
