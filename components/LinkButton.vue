<script setup>
defineProps({
  path: {
    type: String,
    default: null,
  },
})
</script>

<template>
  <NuxtLink
    :to="path"
    class="cursor-pointer inline-block rounded-xl font-medium tracking-wider transition duration-500 flex justify-center items-center hover:bg-[#7396ad] hover:bg-opacity-40 text-3.5 py-1 px-2 h-7.5"
    active-class="underline font-normal text-white"
  >
    <span class="m-2">
      <slot />
    </span>
  </NuxtLink>
</template>
