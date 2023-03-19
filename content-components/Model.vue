<script setup>
const props = defineProps({
  model: {
    type: String,
    default: '',
  },
})

const modelText = props.model ? props.model.replace(/-/g, ' ') : ''
const title = modelText.length === 1 ? `Service ${modelText}` : modelText
</script>

<template>
  <h1
    class="font-bold tracking-wider text-[10.25rem] leading-[1.15] py-1 capitalize mw-auto px-1 text-white light:text-[#393c41]"
  >
    {{ title }}
  </h1>
</template>
