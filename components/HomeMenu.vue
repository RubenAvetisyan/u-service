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
  background: {
    type: String,
    default: '',
  },
  textMargine: {
    type: String,
    default: 'mt-6',
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
  <NuxtLink :to="!!path ? `${baseUrl}${routesPrefix}${path}` : '/'" :class="[bgColor]"
    class="group flex-wrap-reverse bg-opacity-35 objcet-cover cursor-pointer overflow-hidden backdrop-blur-sm relative shadow-lg ring-1 ring-white/5 light:ring-black/5 items-center hover:shadow-md hover:shadow-gray-700 dark:hover:shadow-white hover:light:bg-slate-800 hover:dark:highlight-white/5 hover:bg-gradient-to-r from-transparent via-gray-500/50 to-transparent"
    @click.stop="onClick">
    <img v-if="background" :src="background" :alt="path"
      class="rounded-full object-cover h-full w-full backdrop-blur-10 opacity-70 dark:opacity-50 group-hover:opacity-50 transition-all ease-in-out duration-150"
      width="180px" height="180px">
    <div class="place-content-center w-full h-full" :class="[background ? 'absolute inset-0' : '']">
      <div class="relative w-full h-full">
        <div class="w-full h-full absolute z-10 place-content-center mx-auto items-center" :class="[textMargine]">
          <img v-if="icon"
            class="w-6 h-6 shadow-lg rounded-full mx-auto transition duration-800 delay-75 ease-in-out group-hover:scale-125 group-hover:animate-bounce group-hover:grayscale shadow-lg shadow-[#0080BF] group-hover:invert"
            :src="icon" width="120px" height="120px">
          <div
            class="flex flex-col tracking-tight text-center place-content-center align-middle pa-5 w-full justify-center content-center items-center transition duration-600 ease-in-out group-hover:scale-112">
            <slot v-if="!$slots['first-line'] && !$slots['secont-line']" />
            <span v-if="$slots['first-line']"
              class="text-sm font-medium font-bold text-dark-200 group-hover:text-light-500 group-hover:dark:text-dark-500 dark:text-light-300">
              <slot name="first-line" as="template" />
            </span>
            <span v-if="$slots['second-line']"
              class="text-light-100 text-sm font-medium text-dark-300  group-hover:text-light-600 group-hover:dark:text-dark-600 dark:text-light-400">
              <slot name="second-line" />
            </span>
          </div>
        </div>

        <div v-if="background"
          class="absolute z-0 flex top-0 left-0 place-content-center mx-auto items-center justify-center w-full h-full">
          <div
            class="rounded-full h-[9rem] w-[9rem] bg-light-50 group-hover:bg-light-800 dark:bg-dark-50  opacity-50 dark:opacity-70 transition-all ease-in-out duration-150" />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
