<template>
  <div class="bg-fx" aria-hidden="true">
    <div class="dot-grid" />

    <Motion as="div" class="orb orb-blue" :style="{ x: orbX, y: orbY }" />

    <div class="orb orb-indigo" />
    <div class="orb orb-cyan" />
  </div>
</template>

<script setup lang="ts">
import { useMotionValue, useSpring } from 'motion-v';

const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);

const orbX = useSpring(mouseX, { stiffness: 35, damping: 22, mass: 0.6 });
const orbY = useSpring(mouseY, { stiffness: 35, damping: 22, mass: 0.6 });

const onMouseMove = (e: MouseEvent) => {
  mouseX.set(e.clientX - 340);
  mouseY.set(e.clientY - 340);
};

onMounted(() => {
  mouseX.set(window.innerWidth / 2 - 340);
  mouseY.set(window.innerHeight / 2 - 340);
});

useWindowEvent('mousemove', onMouseMove, { passive: true });
</script>

<style scoped>
.bg-fx {
  position: fixed;
  inset: 0;
  z-index: -10;
  overflow: hidden;
  pointer-events: none;
}

/* ── Dot grid ─────────────────────────────────────────── */
.dot-grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.07) 1px,
    transparent 1px
  );
  background-size: 28px 28px;
  -webkit-mask-image: radial-gradient(
    ellipse 80% 80% at 50% 50%,
    black 40%,
    transparent 100%
  );
  mask-image: radial-gradient(
    ellipse 80% 80% at 50% 50%,
    black 40%,
    transparent 100%
  );
}

/* ── Shared orb base ──────────────────────────────────── */
.orb {
  position: absolute;
  border-radius: 50%;
  will-change: transform;
}

.orb-blue {
  width: 680px;
  height: 680px;
  top: 0;
  left: 0;
  filter: blur(72px);
  background: radial-gradient(
    circle at center,
    rgba(59, 130, 246, 0.28),
    transparent 65%
  );
}

.orb-indigo {
  width: 580px;
  height: 580px;
  bottom: -160px;
  right: -160px;
  filter: blur(80px);
  background: radial-gradient(
    circle at center,
    rgba(99, 102, 241, 0.22),
    transparent 70%
  );
  animation: driftB 22s ease-in-out infinite;
}

.orb-cyan {
  width: 460px;
  height: 460px;
  top: 30%;
  left: 40%;
  filter: blur(90px);
  background: radial-gradient(
    circle at center,
    rgba(6, 182, 212, 0.14),
    transparent 70%
  );
  animation: pulse 8s ease-in-out infinite;
}

/* ── Keyframes ────────────────────────────────────────── */
@keyframes driftB {
  0%,
  100% {
    transform: translate(0px, 0px) scale(1);
  }
  35% {
    transform: translate(-60px, -40px) scale(1.08);
  }
  70% {
    transform: translate(40px, -70px) scale(0.95);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.25);
    opacity: 1;
  }
}
</style>
