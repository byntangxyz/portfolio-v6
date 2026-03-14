<template>
  <div class="flex flex-col gap-32 pt-28 pb-24">
    <HomeHero />
    <LazyHomeTechStack />
    <LazyHomeProjects />
    <LazyHomeAbout />
    <LazyHomeContact />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Bintang Murtifandy ─ Fullstack Developer and Network Engineering',
  description:
    'Hello world! I am Bintang Murtifandy, a Fullstack Web Developer and DevOps learner currently exploring Network Engineering and infrastructure. Let us connect and share ideas.',
  ogTitle: 'Bintang Murtifandy ─ Fullstack Developer and Network Engineering',
  ogDescription:
    'Hello world! I am Bintang Murtifandy, a Fullstack Web Developer and DevOps learner currently exploring Network Engineering and infrastructure. Let us connect and share ideas.',
  twitterTitle:
    'Bintang Murtifandy ─ Fullstack Developer and Network Engineering',
  twitterDescription:
    'Hello world! I am Bintang Murtifandy, a Fullstack Web Developer and DevOps learner currently exploring Network Engineering and infrastructure. Let us connect and share ideas.',
});
</script>
