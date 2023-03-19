<template>
  <div class="w-full max-w-lg">
    <div class="relative animate-spin animate-duration-20000">
      <div
        class="absolute w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 top-0 -left-4 bg-slate-400 animate-shape-left" />
      <div
        class="absolute w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 top-0 -right-4 bg-teal-300 animate-shape-right" />
      <div
        class="absolute w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 -bottom-8 left-20 bg-blue-300 animate-shape-top" />
    </div>
    <div class=" m-8 relative space-y-4">
      <slot />
    </div>
    <!-- <div class="m-8 relative space-y-4">
        <div class="p-5 bg-white rounded-lg flex items-center justify-between space-x-8">
          <div class="flex-1">
            <div class="h-4 w-48 bg-gray-300 rounded"></div>
          </div>
          <div>
            <div class="w-24 h-6 rounded-lg bg-purple-300"></div>
          </div>
        </div>
        <div class="p-5 bg-white rounded-lg flex items-center justify-between space-x-8">
          <div class="flex-1">
            <div class="h-4 w-56 bg-gray-300 rounded"></div>
          </div>
          <div>
            <div class="w-20 h-6 rounded-lg bg-yellow-300"></div>
          </div>
        </div>
        <div class="p-5 bg-white rounded-lg flex items-center justify-between space-x-8">
          <div class="flex-1">
            <div class="h-4 w-44 bg-gray-300 rounded"></div>
          </div>
          <div>
            <div class="w-28 h-6 rounded-lg bg-pink-300"></div>
          </div>
        </div>
      </div> -->
  </div>
</template>
