<script setup>
const props = defineProps({
  images: {
    type: Array,
    default: []
  }
})

const parentElement = ref(null)
const currentElement = ref(null)
const previousElement = ref(null)

let toggle = (currentIndex, nextIndex) => {
  [currentIndex, nextIndex].forEach(index => {
    parentElement.value.children[index].classList.toggle('hidden')
    parentElement.value.children[index].classList.toggle('-translate-x-1/2')
  })
  console.log('currentIndex: ', parentElement.value.children[currentIndex]);
  console.log('nextIndex: ', parentElement.value.children[nextIndex]);
}

const imagesLastIndex = props.images.length - 1
let index = ref(0)

const setIndex = (id) => {
  let el = document.querySelector(`#image-slide-${id}`)

  if (!el) return

  el.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

const direction = ref('next')
setInterval(() => {
  if (direction === 'next') {
    index.value = 0
    incIndex()
  } else {
    decIndex()
  }
}, 2500)

const incIndex = () => {
  if (index.value !== 0 && index.value > imagesLastIndex) {
    index.value = 0
    direction.value = 'previous'
  } else {
    index.value++
  }

  const nextIndex = index.value
  setIndex(nextIndex)
}
const decIndex = () => {
  if (index.value !== 0 && index.value < 0) {
    index.value = 0
    direction.value = 'next'
  } else {
    index.value--
  }

  const nextIndex = index.value
  setIndex(nextIndex)
}
</script>

<template>
  <div id="default-carousel" class="relative overflow-hidden">
    <!-- Carousel wrapper -->
    <div id="head"
      class="flex overflow-y-hidden overflow-x-auto snap-x snap-mandatory before:shrink-0 before:w-[30vw] after:shrink-0 after:w-[30vw] object-center relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96">
      <!-- Item 1 -->
      <div v-for="(image, i) in images" :key="`image-slide-${i}`" :id="`image-slide-${i}`"
        class="duration-700 ease-in-out shrink-0 snap-center place-content-center object-center">
        <!-- <span
          class="absolute top-1/2 left-1/2 text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 sm:text-3xl dark:text-gray-800">First
          {{ `image-slide-${i}` }}</span> -->
        <img :src="image" class="object-center object-cover h-95 md:h-168 xl:h-240 -translate-y-1/4 md:-translate-y-1/3"
          :alt="`image slide ${i}`">
      </div>
    </div>
    <!-- Slider indicators -->
    <div class="flex absolute bottom-5 left-1/2 z-30 gap-3 -translate-x-1/2">
      <button v-for="(image, i) in images" :key="`slide-button-${i}`" type="button" @click.stop="() => setIndex(i)"
        class="shrink-0 w-3 h-3 rounded-full bg-light-100 backdrop-blur-sm opacity-25 light:opacity-50 space-y-3"
        aria-current="false" :aria-label="`Slide ${i}`"></button>
    </div>
    <!-- Slider controls -->
    <button type="button"
      class="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
      data-carousel-prev @click="decIndex">
      <span
        class="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
        <svg class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor"
          viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        <span class="hidden">Previous</span>
      </span>
    </button>
    <button type="button"
      class="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
      data-carousel-next @click="incIndex">
      <span
        class="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
        <svg class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor"
          viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
        <span class="hidden">Next</span>
      </span>
    </button>
  </div>


</template>
