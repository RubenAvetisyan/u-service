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

const btnClass = props.dark ? 'bg-opacity-80 bg-white dark:bg-[#181a1f] text-[#393c41] dark:text-white' : 'bg-opacity-63 dark:bg-white bg-[#181a1f] dark:text-[#393c41] text-white'
</script>

<template>
  <a
    href="#"
    class="inline-block rounded-2xl text-center tracking-wider font-medium uppercase flex justify-center items-center text-3 w-64 h-10" :class="[btnClass]"
  >
    <span v-if="text">{{ text }}</span>
    <slot v-else />
  </a>
</template>
