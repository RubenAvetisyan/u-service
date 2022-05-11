<script setup>
/* eslint-disable no-console */
const route = useRoute()

useMeta({
  title: `About us - ${route?.path}`,
  style: { type: 'text/css', children: '#__nuxt > div {background-color: #f7f}' },
})

const { pending, data: pages } = await useAsyncData(
  'pages',
  () => notionFetch('/pages', { lazy: true }),
)

// When query string changes, refresh
watch(() => pending, async(a, b) => {
  console.log('a, b: ', a, b)
})
</script>

<template>
  <div class="container mx-auto pt-20 items-center">
    <h1 class="flex items-center align-center justify-center font-bold text-size-[2.5rem]">
      <pre>{{pages}}</pre>
    </h1>
  </div>
</template>
