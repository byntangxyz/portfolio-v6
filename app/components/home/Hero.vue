<template>
  <section class="flex flex-col gap-6 max-w-3xl">
    <Motion
      as="p"
      class="font-pjs text-blue-400 text-sm tracking-widest uppercase"
      :initial="{ opacity: 0, y: 14 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.45, delay: 0.1, ease: 'easeOut' }"
    >
      Hello, World!
    </Motion>

    <Motion
      as="h1"
      class="font-pixel text-5xl md:text-7xl font-bold uppercase leading-tight"
      :initial="{ opacity: 0, y: 28 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }"
    >
      Bintang<br />
      <span class="text-blue-400"> Murtifandy</span>
    </Motion>

    <Motion
      as="p"
      class="font-mono text-xl md:text-2xl text-white/60"
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5, delay: 0.3, ease: 'easeOut' }"
    >
      <span>> {{ displayedRole }}</span
      ><span class="cursor">|</span>
    </Motion>

    <Motion
      as="p"
      class="font-inter text-base md:text-lg text-white/45 max-w-xl leading-relaxed"
      :initial="{ opacity: 0, y: 18 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5, delay: 0.42, ease: 'easeOut' }"
    >
      Student who want's to be programmer, currently learning about web
      development, networking and infrastructure. I have a passion for learning
      new technologies as my tagline
      <em class="italic font-mono text-blue-400"
        >"Never stop learning and keep it slow"</em
      >
    </Motion>

    <Motion
      as="div"
      class="flex flex-wrap gap-4 pt-2"
      :initial="{ opacity: 0, y: 16 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5, delay: 0.54, ease: 'easeOut' }"
    >
      <UButton
        to="/portofolio"
        size="xl"
        color="info"
        class="font-pjs"
        trailing-icon="i-lucide-arrow-right"
      >
        View My Work
      </UButton>
      <UButton
        to="/contact"
        size="xl"
        color="neutral"
        variant="outline"
        class="font-pjs"
      >
        Contact Me
      </UButton>
    </Motion>
  </section>
</template>

<script setup lang="ts">
const roles = ['Fullstack Web Developer', 'Tech Ethusiast', 'Network Engineer'];

const displayedRole = ref('');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let timer: ReturnType<typeof setTimeout> | null = null;

const tick = () => {
  const current = roles[roleIndex]!;

  if (isDeleting) {
    charIndex--;
    displayedRole.value = current.slice(0, charIndex);
  } else {
    charIndex++;
    displayedRole.value = current.slice(0, charIndex);
  }

  let delay = isDeleting ? 38 : 82;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 420;
  }

  timer = setTimeout(tick, delay);
};

onMounted(() => {
  timer = setTimeout(tick, 900);
});

onUnmounted(() => {
  if (timer) clearTimeout(timer);
});
</script>

<style scoped>
.cursor {
  display: inline-block;
  margin-left: 2px;
  color: rgb(96 165 250);
  font-weight: 300;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
