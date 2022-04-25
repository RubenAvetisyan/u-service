<template>
  <div class="flex flex-wrap col-auto justify-between mt-4 h-full">
    <div
      class="flex-0 sm:w-15 md:w-45 bg-blue-600 rounded-2 pa-1 break-words h-full order-first"
    >
      <slot name="first"></slot>
    </div>

    <div class="grow bg-blue-600 rounded-2 mx-1 pa-1">
      <slot name="middle"></slot>
    </div>

    <div
      class="flex-0 sm:w-15 md:w-45 bg-blue-600 rounded-2 pa-1 break-words h-full order-last"
    >
      <slot name="last"></slot>
    </div>
  </div>
</template>
