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
    class="font-bold tracking-wider leading-[1.15] text-[#393c41] text-10.5 py-1 capitalize"
  >{{ title }}</h1>
</template>
