<script setup>

const props = defineProps({
  routesPrefix: {
    type: String,
    default: '',
  },
  path: {
    type: String || null,
    default: null,
  },
})

const { baseUrl } = useRuntimeConfig()
</script>

<template>
  <NuxtLink :to="!!path ? `${baseUrl}${path ? routesPrefix : ''}${path}` : '/'"
    class="group space-x-10 cursor-pointer overflow-hidden relative max-w-sm max-h-12 mx-auto my-2 bg-white shadow-lg ring-1 ring-black/5 rounded-xl flex items-center gap-6 hover:shadow-md hover:shadow-gray-300 hover:dark:bg-slate-800 hover:dark:highlight-white/5 hover:bg-gradient-to-r from-red-100 via-blue-500/50 to-gray-100"
  >
    <img
      class="absolute left-3 w-6 h-6 rounded-full shadow-lg transition duration-800 delay-75 ease-in-out group-hover:scale-125 group-hover:animate-bounce group-hover:grayscale shadow-lg shadow-red-600 group-hover:invert"
      src="/tesla-svgrepo-com.svg"
    />
    <div
      class="flex flex-col py-5 w-full lg:items-center transition duration-600 ease-in-out group-hover:scale-115"
    >
      <slot v-if="!$slots['first-line'] && !$slots['secont-line']"></slot>
      <strong class="text-slate-900 text-sm font-medium dark:text-slate-200">
        <slot name="first-line" as="template"></slot>
      </strong>
      <span class="text-slate-500 text-sm font-medium dark:text-slate-400">
        <slot name="secont-line"></slot>
      </span>
    </div>
  </NuxtLink>
</template>
