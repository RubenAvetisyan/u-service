<script setup>
/* eslint-disable no-console */
import { storeToRefs } from 'pinia'
const route = useRoute()
const pending = usePending()
const { isSidebarHidden } = storeToRefs(useStore())

const nuxtApp = useNuxtApp()
const loading = useLoading()
nuxtApp.hook('app:beforeMount', () => {
  loading.value = true
  // console.log('loading.value: ', loading.value)
})

nuxtApp.hook('page:finish', () => {
  loading.value = false
  // console.log('loading.value: ', loading.value)
})

const { $device } = nuxtApp
const backgroundImg = computed(() => {
  const bg = useBackgroundImg()
  if (!bg.value)
    useMyBackgroundImg()

  return bg.value
})

const path = ref(!!useGetFirstParam('model'))

const mainClass = ref('')
const backgroundImageOpacity = ref(!path.value ? 'opacity-37' : 'opacity-80')

watch(() => route.fullPath, (a, b) => {
  if (a !== b)
    useMyBackgroundImg()

  path.value = !!useGetFirstParam('model')

  mainClass.value = path.value ? 'snap-y snap-mandatory' : ''
  backgroundImageOpacity.value = !path.value ? 'opacity-37' : 'opacity-80'
  })
</script>

<template>
  <div class="box-border flex flex-col md:items-center h-full w-full">
    <div :style="`background-image: url('${backgroundImg}');`"
      :class="['fixed z-0 top-0 left-0 h-full w-full bg-current bg-center bg-cover bg-fixed bg-center', backgroundImageOpacity]">
    </div>
    <!-- sidebar -->
    <r-side-nav v-if="isSidebarHidden && !pending" />

    <!-- header -->
    <header v-if="!pending && ($slots.nav || $slots.logo || $slots['header-right'])"
      class="z-30 justify-center h-13.5 z-10 flex justify-between fixed md:inset-0 backdrop-blur-sm bg-opacity-50 dark:bg-opacity-10 bg-light-400 dark:bg-dark-900"
      style="min-height: 54px; min-width: 100%;">
      <div v-if="!!$slots.logo" id="logo" class="flex items-center pl-6 md:pl-8 min-h-13.5 max-h-[54px]"
        style="max-height: 54px;">
        <slot name="logo" />
      </div>

      <div :class="['flex h-13.5 lg:w-3/7']">
        <slot name="nav" />
      </div>

      <slot name="header-right" />
      <slot name="color-mode"></slot>
    </header>

    <main class="z-20 snap-y snap-mandatory overflow-y-scroll overflow-x-hidden w-full h-screen">
      <slot />
    </main>

    <ClientOnly>
      <Teleport to="body">
        <div v-if="loading"
          class="absolute top-0 left-0 bg-white w-screen h-full backdrop-blur-sm opacity-25 flex items-center justify-center mx-auto pa-4 z-40">
          <div class=" flex justify-center items-center">
            <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
          </div>
        </div>
      </Teleport>
    </ClientOnly>

    <footer v-if="$slots.footer"
      class="grid grid-cols-3 gap-4 px-4 w-fill h-18.75 bg-dark text-center text-white items-center content-center b-0 fixed bottom-0 left-0 right-0 z-10">
      <slot name="footer" />
    </footer>
  </div>
</template>
