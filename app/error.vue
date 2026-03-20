<template>
  <NuxtLayout name="default">
    <UError
      :clear="{
        color: 'neutral',
        size: 'xl',
        icon: 'i-lucide-arrow-left',
        class: 'rounded-full',
      }"
      :error="{
        statusCode: 404,
        statusMessage: 'Page not found',
        message: 'The page you are looking for does not exist.',
      }"
      redirect="/"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '404 - Page Not Found',
  description: 'The requested page could not be found.',
  robots: 'noindex,nofollow',
});
</script>

<style scoped></style>
