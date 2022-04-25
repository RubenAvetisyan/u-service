<script setup>
defineProps({
  fn: {
    type: Function,
    default: () => { },
  },
})
</script>

<template>
  <div class="justify-center flex mx-auto w-full">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-chevron-down cursor-pointer animate-bounce"
      viewBox="0 0 16 16"
      @click="fn"
    >
      <path
        fill-rule="evenodd"
        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
      />
    </svg>
  </div>
</template>
