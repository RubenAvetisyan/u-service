<script setup>
const props = defineProps({
  imgUrl: {
    type: String,
    default: ''
  },
  lastItem: {
    type: Boolean,
    default: false
  },
  itemKey: {
    type: Number,
    default: 0
  },
  itemClass: {
    type: String,
    default: ''
  }
})

const scrollDown = useChevronScrollDown()
</script>

<template>
  <div :style="`background-image: url('${imgUrl}');`" class="model-contents-container" :class="[itemClass]">
    <div class="model-contents-home-menu-container">
      <slot name="btn"></slot>
    </div>

    <slot name="description"></slot>

    <ContentChevronDown :key="`chevron-${itemKey}`" class="model-content-chevron"
      :fn="scrollDown(lastItem ? '#main-content' : `#content-${itemKey + 1}`)"
      :class="[lastItem ? 'rotate-180' : null]" />
  </div>
</template>
