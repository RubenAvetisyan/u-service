<script setup>
const props = defineProps({
  imgUrl: {
    type: String,
    default: '',
  },
  lastItem: {
    type: Boolean,
    default: false,
  },
  itemKey: {
    type: Number,
    default: 0,
  },
  itemClass: {
    type: String,
    default: '',
  },
})

const scrollDown = useChevronScrollDown()
</script>

<template>
  <div :style="`background-image: url('${imgUrl}');`"
    class="snap-start h-full md:h-screen w-screen relative bg-cover bg-fixed bg-center flex flex-col text-center items-center justify-center px-4 place-content-center"
    :class="[itemClass]">
    <div class="relative flex mx-auto items-center justify-center h-10 text-center content-center mb-8">
      <slot name="btn" />
    </div>

    <slot name="description" />

    <ContentChevronDown :key="`chevron-${itemKey}`" class="absolute bottom-[1rem] inset-x-0"
      :fn="scrollDown(lastItem ? '#main-content' : `#content-${itemKey + 1}`)"
      :class="[lastItem ? 'rotate-180' : null]" />
  </div>
</template>
