<script setup lang="ts">
const thumbHeight = ref(20);
const thumbTop = ref(0);
const isVisible = ref(false);
const isHovering = ref(false);

let hideTimeout: ReturnType<typeof setTimeout> | null = null;

const updateScrollbar = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollHeight <= clientHeight) return;

  const ratio = clientHeight / scrollHeight;
  thumbHeight.value = Math.max(ratio * 100, 6);
  thumbTop.value =
    (scrollTop / (scrollHeight - clientHeight)) * (100 - thumbHeight.value);

  isVisible.value = true;

  if (!isHovering.value) {
    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      isVisible.value = false;
    }, 1500);
  }
};

onMounted(() => {
  updateScrollbar();
});

onUnmounted(() => {
  if (hideTimeout) clearTimeout(hideTimeout);
});

useWindowEvent('scroll', updateScrollbar, { passive: true });
</script>

<template>
  <Motion
    as="div"
    class="fixed right-2 top-2 bottom-2 w-[5px] z-[9999] pointer-events-none"
    :initial="{ opacity: 0 }"
    :animate="{ opacity: isVisible || isHovering ? 1 : 0 }"
    :transition="{ duration: 0.35, ease: 'easeInOut' }"
  >
    <div class="absolute inset-0 rounded-full bg-white/5" />

    <Motion
      as="div"
      class="absolute inset-x-0 rounded-full pointer-events-auto cursor-pointer"
      :class="
        isHovering
          ? 'bg-blue-400/90 shadow-[0_0_8px_2px_rgba(96,165,250,0.4)]'
          : 'bg-blue-400/55'
      "
      :animate="{
        top: `${thumbTop}%`,
        height: `${thumbHeight}%`,
        scaleX: isHovering ? 1.6 : 1,
      }"
      :transition="{ type: 'spring', stiffness: 380, damping: 35 }"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
    />
  </Motion>
</template>
