<script setup>
/* eslint-disable no-console */
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

const zIndex = computed(() => {
  console.log('sidebar.value: ', sidebar.value)
  return sidebar.value ? 'z-50' : 'z-0'
})

const { $device } = useNuxtApp()

const isDesktopOrTablet = $device.isDesktop
</script>

<template>
  <div
    class="flex flex-col md:items-center h-screen w-screen md:w-screen bg-current bg-center sm:bg-cover md:bg-clip-content">
    <!-- sidebar -->
    <r-side-nav v-if="isDesktopOrTablet && sidebar"></r-side-nav>

    <!-- header -->
    <header v-if="!pending && ($slots.nav || $slots.logo || $slots['header-right'])"
      class="justify-center h-13.5 z-10 flex md:flex-wrap justify-between fixed md:inset-0 backdrop-blur-sm bg-opacity-20 bg-dark-50"
      style="min-height: 54px; min-width: 100%;">
      <div v-if="!!$slots.logo" id="logo"
        class="flex items-center pl-6 md:pl-8 w-61.25 min-h-13.5 max-h-[54px] overflow-hidden"
        style="max-height: 54px;">
        <slot name="logo" />
      </div>

      <slot name="nav" />

      <slot name="header-right" />
    </header>

    <main class="snap-y snap-mandatory md:overflow-scroll sm:w-screen overflow-x-hidden h-screen">
      <slot />
    </main>

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

    <footer v-if="$slots.footer"
      class="grid grid-cols-3 gap-4 px-4 w-fill h-18.75 bg-dark text-center text-white items-center content-center b-0 fixed bottom-0 left-0 right-0 z-10">
      <slot name="footer" />
    </footer>
  </div>
</template>
