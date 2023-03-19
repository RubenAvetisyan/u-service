<script setup>
const props = defineProps({
  aHref: {
    type: String,
    default: () => '#',
  },
})

const href = computed(() => props.aHref)
</script>

<template>
  <a :href="href"
    class="transition border-b hover:border-b-2 border-light-100 text-light-100 light:border-[#5c5d61] light:text-[#5c5d61] hover:border-blue-300 hover:text-blue-300 light:hover:border-light-300 light:hover:text-light-300">
    <slot />
  </a>
</template>
