<script steup>
defineProps({
  href: {
    type: String,
    default: '#'
  }
})
</script>

<template>
  <a :href="href" class="anim-link">
    <slot />
  </a>
</template>
