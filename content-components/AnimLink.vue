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
  <a :href="href" class="anim-link">
    <slot />
  </a>
</template>
