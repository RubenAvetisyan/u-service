<script setup>
/* eslint-disable no-console */
const props = defineProps({
  routesPrefix: {
    type: String,
    default: '',
  },
  path: {
    type: String || null,
    default: null,
  },
  color: {
    type: String,
    default: 'white',
  },
  icon: {
    type: String,
    default: '',
  },
})

useHead({
  name: 'HomeMenu',
})

const { baseUrl } = useRuntimeConfig()

const bgColor = computed(() => props?.color)

const loading = useLoading()

const onClick = () => {
  loading.value = true
}
</script>

<template>
  <NuxtLink
    :to="!!path ? `${baseUrl}${routesPrefix}${path}` : '/'" class="group flex-wrap-reverse bg-opacity-35 cursor-pointer overflow-hidden backdrop-blur-sm relative shadow-lg ring-1 ring-black/5 items-center hover:shadow-md hover:shadow-gray-300 hover:dark:bg-slate-800 hover:dark:highlight-white/5 hover:bg-gradient-to-r from-transparent via-gray-500/50 to-transparent" :class="[bgColor]"
    @click.stop="onClick"
  >
    <img
      v-if="icon"
      class="w-6 h-6 shadow-lg rounded-full mx-auto transition duration-800 delay-75 ease-in-out group-hover:scale-125 group-hover:animate-bounce group-hover:grayscale shadow-lg shadow-[#0080BF] group-hover:invert"
      :src="icon"
    >
    <div
      class="flex flex-col text-center align-middle pa-5 w-full justify-center content-center items-center transition duration-600 ease-in-out group-hover:scale-115"
    >
      <slot v-if="!$slots['first-line'] && !$slots['secont-line']" />
      <span v-if="$slots['first-line']" class="text-light-50 text-sm font-medium font-bold dark:text-slate-200">
        <slot name="first-line" as="template" />
      </span>
      <span v-if="$slots['second-line']" class="text-slate-300 text-sm font-medium dark:text-slate-400">
        <slot name="second-line" />
      </span>
    </div>
  </NuxtLink>
</template>
