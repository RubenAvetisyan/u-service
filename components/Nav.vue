<script setup>
const props = defineProps({
  color: {
    type: String,
    default: 'bg-transparent',
  },
  height: {
    type: Number,
    default: 48,
  },
  width: {
    type: [Number, String],
    default: '100%',
  },
})

const aplly = `h-${props.height / 4}`
</script>

<template>
  <div class="flex text-gray-300 capitalize">
    <slot />
  </div>
</template>
