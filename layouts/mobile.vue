<script setup>
/* eslint-disable no-console */
const route = useRoute()
const pending = usePending()
const sidebar = useSidebar()

const nuxtApp = useNuxtApp()
const loading = useLoading()
nuxtApp.hook('app:beforeMount', () => {
  loading.value = true
  console.log('loading.value: ', loading.value)
})

nuxtApp.hook('page:finish', () => {
  loading.value = false
  console.log('loading.value: ', loading.value)
})
const backgroundImg = computed(() => {
  const bg = useBackgroundImg()
  if (!bg.value) useMyBackgoundImg()

  return bg.value
})

watch(() => route.fullPath, (a, b) => {
  if (a !== b) useMyBackgoundImg()
})
</script>

<template>
  <div :style="`background-image: url('${backgroundImg}');`"
    class="flex flex-col items-center h-screen w-screen bg-current bg-center bg-cover bg-fixed">
    <!-- sidebar -->
    <r-side-nav v-if="sidebar"></r-side-nav>

    <!-- header -->
    <header v-if="!pending && ($slots.nav || $slots.logo || $slots['header-right'])"
      class="justify-center h-13.5 z-10 flex md:flex-wrap justify-between fixed md:inset-0 backdrop-blur-sm bg-opacity-20 bg-dark-50"
      style="min-height: 54px; min-width: 100%;">
      <div v-if="!!$slots.logo" id="logo"
        class="flex items-center pl-6 md:pl-8 w-61.25 min-h-13.5 max-h-[54px] overflow-hidden"
        style="max-height: 34px;">
        <slot name="logo" />
      </div>

      <slot name="nav" />

      <slot name="header-right" />
    </header>

    <main class="w-screen h-screen">
      <slot />
    </main>

    <footer v-if="$slots.footer"
      class="grid grid-cols-3 gap-4 px-4 w-fill h-18.75 bg-dark text-center text-white items-center content-center b-0 fixed bottom-0 left-0 right-0 z-10">
      <slot name="footer" />
    </footer>

    <ClientOnly>
      <Teleport to="body">
        <div v-if="loading"
          class="absolute top-0 left-0 bg-white w-screen h-full backdrop-blur-sm opacity-25 flex items-center justify-center mx-auto pa-4 z-40">
          <div class=" flex justify-center items-center">
            <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </Teleport>
    </ClientOnly>
  </div>
</template>
