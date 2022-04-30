<script setup>
/* eslint-disable no-console */
const pending = usePending()
</script>

<template>
  <div
    class="flex flex-col items-center h-screen w-screen bg-current bg-center bg-cover"
  >
    <!-- sidebar -->
    <r-side-nav></r-side-nav>

    <!-- header -->
    <header
      v-if="!pending && ($slots.nav || $slots.logo || $slots['header-right'])"
      class="justify-center h-13.5 z-10 flex md:flex-wrap justify-between fixed md:inset-0"
      style="min-height: 54px; min-width: 100%;"
    >
      <div
        v-if="!!$slots.logo"
        id="logo"
        class="flex items-center pl-6 md:pl-8 w-61.25 min-h-13.5 max-h-[54px] overflow-hidden"
        style="max-height: 54px;"
      >
        <slot name="logo" />
      </div>

      <slot name="nav" />

      <slot name="header-right" />
    </header>

    <main class="w-screen h-screen">
      <slot />
    </main>

    <footer
      v-if="$slots.footer"
      class="grid grid-cols-3 gap-4 px-4 w-fill h-18.75 bg-dark text-center text-white items-center content-center b-0 fixed bottom-0 left-0 right-0 z-10"
    >
      <slot name="footer" />
    </footer>
  </div>
</template>
