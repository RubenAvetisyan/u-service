<script setup>
const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
})

const pending = usePending()

const imagesLastIndex = props.images.length - 1
const index = ref(0)

const setSlide = (id) => {
  const el = document.querySelector(`#image-slide-${id}`)

  if (!el)
    return

  const { x } = el.getBoundingClientRect()

  document.getElementById('head').scrollTo(x, 0)
}

const direction = ref('next')

const incIndex = () => {
  if (index.value !== 0 && index.value > imagesLastIndex) {
    index.value = 0
    direction.value = 'previous'
  }
  else {
    index.value++
  }

  const nextIndex = index.value
  setSlide(nextIndex)
}
const decIndex = () => {
  if (index.value < 0) {
    index.value = 0
    direction.value = 'next'
  }
  else {
    index.value--
  }

  const nextIndex = index.value
  setSlide(nextIndex)
}

let interval = null
let timeout = (ms, cb = () => { }) => window.setTimeout(() => {
  cb()
}, ms)

const action = () => {
  if (direction.value === 'next')
    incIndex()
  else
    decIndex()
}

const callback = () => {
  action()
  interval = timeout(2500, callback)
}

onMounted(() => {
  interval = timeout(2500, callback)
})

onBeforeUnmount(() => {
  window.clearInterval(interval)
  timeout = null
})

const onActionButton = (directionWay = 'next') => {
  window.clearInterval(interval)
  direction.value = directionWay
  interval = null
  action()
  if (interval)
    return
  interval = timeout(5000, callback)
}
</script>

<template>
  <div id="default-carousel" class="relative overflow-hidden" style="min-height: 14rem; min-width: 100%;">
    <!-- Carousel wrapper -->
    <div
      id="head" vif="!pending"
      class="flex scroll-smooth overflow-y-hidden overflow-x-auto snap-x snap-mandatory before:shrink-0 before:w-[30vw] after:shrink-0 after:w-[30vw] object-center relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96"
    >
      <!-- Item 1 -->
      <div
        v-for="(image, i) in images" :id="`image-slide-${i}`" :key="`image-slide-${i}`"
        class="duration-700 ease-in-out shrink-0 snap-center place-content-center object-center"
      >
        <!-- <span
          class="absolute top-1/2 left-1/2 text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 sm:text-3xl dark:text-gray-800">First
          {{ `image-slide-${i}` }}</span> -->
        <img
          :src="image" class="object-center object-cover h-95 md:h-168 xl:h-240 -translate-y-1/4 md:-translate-y-1/3"
          :alt="`image slide ${i}`"
        >
      </div>
    </div>
    <!-- Slider indicators -->
    <div class="flex absolute bottom-5 left-1/2 z-30 gap-3 -translate-x-1/2">
      <button
        v-for="(image, i) in images" :key="`slide-button-${i}`" type="button"
        class="shrink-0 w-6 h-6 md:w-3 md:h-3 rounded-full bg-light-100 dark:bg-dark-200 hover:bg-blue backdrop-blur-sm opacity-25 hover:opacity-75 space-y-3"
        aria-current="false" :aria-label="`Slide ${i}`" @click.stop="() => setSlide(i)"
      />
    </div>
    <!-- Slider controls -->
    <button
      type="button"
      class="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
      data-carousel-prev @click="() => onActionButton('previous')"
    >
      <span
        class="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
      >
        <svg
          class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor"
          viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span class="hidden">Previous</span>
      </span>
    </button>
    <button
      type="button"
      class="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
      @click="() => onActionButton('next')"
    >
      <span
        class="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
      >
        <svg
          class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor"
          viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <span class="hidden">Next</span>
      </span>
    </button>
  </div>
</template>
