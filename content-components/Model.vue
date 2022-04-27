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
    class="font-bold tracking-wider text-[2.25rem] leading-[1.15] text-[#393c41] text-10.5 py-1 capitalize mw-auto px-1"
  >{{ title }}</h1>
</template>
