<script setup>
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  dark: {
    type: Boolean,
    default: false,
  },
  light: {
    type: Boolean,
    default: true,
  },
})

const btnClass = props.dark ? 'btn-dark' : 'btn-light'
</script>

<template>
  <a href="#" class="btn-link" :class="[btnClass]">
    <span v-if="text">{{ text }}</span>
    <slot v-else />
  </a>
</template>
