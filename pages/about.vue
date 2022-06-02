<script setup>
/* eslint-disable no-console */
const route = useRoute()

useHead({
  title: `About us - ${route?.path}`,
  // style: { type: 'text/css', children: '#__nuxt > div {background-color: #f7f}' },
})

// let interval = setInterval(()=>{
//   timer()
// }, 1000)

// setTimeout(()=>interval.unref, 2000)
</script>

<template>
  <div class="container mx-auto pt-20 items-center">
    <RSlider :images="['/3.avif', '/S.avif', '/X.avif']" />
  </div>
</template>
