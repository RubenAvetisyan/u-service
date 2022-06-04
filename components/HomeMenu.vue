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
    default: ''
  }
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
    <div :class="background ? 'absolute left-0 place-content-center w-full h-full' : ''">
      <div class="relative w-full h-full">
        <div class="w-full h-full absolute z-10 mt-10 place-content-center mx-auto items-center">
          <img v-if="icon"
            class="w-6 h-6 shadow-lg rounded-full mx-auto transition duration-800 delay-75 ease-in-out group-hover:scale-125 group-hover:animate-bounce group-hover:grayscale shadow-lg shadow-[#0080BF] group-hover:invert"
            :src="icon" width="120px" height="120px">
          <div
            class="flex flex-col tracking-tight text-center place-content-center align-middle pa-5 w-full justify-center content-center items-center transition duration-600 ease-in-out group-hover:scale-112">
            <slot v-if="!$slots['first-line'] && !$slots['secont-line']" />
            <span v-if="$slots['first-line']" class="text-light-700 text-sm font-medium font-bold dark:text-light-300">
              <slot name="first-line" as="template" />
            </span>
            <span v-if="$slots['second-line']"
              class="text-light-10 text-sm font-medium text-stone-700 group-hover:text-slate-300 dark:text-light-900/80">
              <slot name="second-line" />
            </span>
          </div>
        </div>

        <div
          class="absolute z-0 flex top-0 left-0 place-content-center mx-auto items-center justify-center w-full h-full">
          <div
            class="rounded-full h-[9rem] w-[9rem] backdrop-blur-10 opacity-70 dark:opacity-50 group-hover:opacity-50 transition-all ease-in-out duration-150">
          </div>
        </div>
      </div>

    </div>

  </NuxtLink>
</template>
