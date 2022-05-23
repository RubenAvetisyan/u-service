<script setup>
defineProps({
  fn: {
    type: Function,
    default: () => { },
  },
  size: { type: [Number, String], default: 16 },
})
</script>

<template>
  <div class="flex mx-auto w-full h-10 items-center mx-auto justify-center content-center z-40">
    <div
      class="cursor-pointer flex rounded-full bg-dark-600 backdrop-blur-sm opacity-75 mx-auto z-50 relative h-10 w-10 content-center items-center justify-center align-middle text-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" fill="currentColor"
        class="bi bi-chevron-down animate-bounce text-stroke-light-100 text-light-100 align-middle text-center relative mt-2" viewBox="0 0 16 16"
        @click="fn"
      >
        <path
          fill-rule="evenodd"
          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </div>
  </div>
</template>
