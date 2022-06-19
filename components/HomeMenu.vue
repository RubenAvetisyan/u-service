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
    <img v-if="background" :src="background" :alt="path" class="home-menu-img" width="180px" height="180px">
    <div class="place-content-center w-full h-full" :class="[background ? 'absolute inset-0' : '']">
      <div class="relative w-full h-full">
        <div class="w-full h-full absolute z-10 place-content-center mx-auto items-center" :class="[textMargine]">
          <img v-if="icon" class="home-menu-icon" :src="icon" width="120px" height="120px">
          <div class="home-menu-text-container">
            <slot v-if="!$slots['first-line'] && !$slots['secont-line']" />
            <span v-if="$slots['first-line']" class="home-menu-first-span">
              <slot name="first-line" as="template" />
            </span>
            <span v-if="$slots['second-line']" class="home-menu-second-span">
              <slot name="second-line" />
            </span>
          </div>
        </div>

        <div v-if="background" class="home-menu-background-container">
          <div class="home-menu-background" />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
