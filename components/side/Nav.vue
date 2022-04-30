<script setup>
/* eslint-disable no-console */
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})

const sidebar = useSidebar()
const hide = () => {
  useSidebarToggle()
  sidebar.value = false
}

const links = useNavigationLinks()

const { $device } = useNuxtApp()

const isDesktopOrTablet = $device.isDesktop

const fullSide = computed(() => {
  return isDesktopOrTablet ? null : 'flex-1'
})

</script>

<template>
  <div
    class="absolute sidebar-wrapper md:invisible flex top-0 left-0 right-0 min-h-screen overflow-hidden"
  >
    <!-- content -->
    <div
      v-if="isDesktopOrTablet"
      id="sidebar-content"
      class="flex-1 p-10 text-2xl font-bold bg-white backdrop-blur-0 bg-opacity-0 transition duration-800 ease-in-out"
      @click.stop="hide"
    ></div>

    <!-- sidebar -->
    <div
      :class="[fullSide, 'sidebar bg-white backdrop-blur-0 bg-opacity-0 text-blue-100 w-64 space-y-6 py-2 px-2 inset-y-0 right-0 transform translate-x-full transition duration-500 ease-in-out delay-100 z-50']"
    >
      <!-- logo -->
      <div class="flex min-h-8 justify-between items-center text-blue-gray-500">
        <div class="flex w-60 h-8 p-2 m-0">
          <r-logo :width="48"></r-logo>
        </div>
        <div class="w-4 items-center justify-center text-center cursor-pointer" @click.stop="hide">
          <RCloseSvg fill="#64748b" />
        </div>
      </div>
      <!-- nav -->
      <nav>
        <r-side-nav-menu
          v-for="({ path, name }) in links"
          :key="`r-nav-link-${name}`"
          routes-prefix="/model"
          :path="path"
          class="block py-2 5 px-4"
          @click.stop="hide"
        >
          <template #first-line>{{ name }}</template>
        </r-side-nav-menu>
      </nav>
    </div>
  </div>
</template>
