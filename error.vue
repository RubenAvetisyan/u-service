<template>
  <div class="flex h-screen w-screen items-center">
    <div class="container mx-auto px-4">
      <h1
        class="text-black text-center p-4 mb-8 border-2 border-red-600 border-rounded-md"
      >{{ error.message }}</h1>
      <div :html="div"></div>
      <content-btn
        text="Go to Home"
        class="bg-opacity-80 bg-blue-500 text-white"
        @click="handleError"
      ></content-btn>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    type: Object,
  },
})

if (process.client && props?.error?.description) {
  const div = document.createElement('div')
  div.innerHTML = props.error.description
}
const handleError = () => clearError({ redirect: '/' })
</script>
