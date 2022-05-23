<script setup>
/* eslint-disable no-console */
const route = useRoute()

useHead({
  title: `About us - ${route?.path}`,
  style: { type: 'text/css', children: '#__nuxt > div {background-color: #f7f}' },
})
</script>

<template>
  <div class="container mx-auto pt-20 items-center">
    <h1 class="flex items-center align-center justify-center font-bold text-size-[2.5rem]" />
  </div>
</template>
