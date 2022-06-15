<script setup>

const translateTop = ref('-translate-y-0')
const translateLeft = ref('-translate-x-0')
const translateRight = ref('translate-x-0')
const num = ref(0)

let timer = null
let repete = (ms) => {
  timer = null
  timer = setTimeout((...args) => {
    const [repetetimeout, milliseconds] = args
    if (!repete || !timer) return

    if (num.value === 0) {
      num.value = num.value + 48
      translateTop.value = '-translate-y-' + num.value
      translateRight.value = 'translate-x-' + num.value
      translateLeft.value = '-translate-x-' + num.value
    }
    else {
      num.value = 0
      translateTop.value = 'translate-y-' + num.value
      translateRight.value = 'translate-x-' + num.value
      translateLeft.value = 'translate-x-' + num.value
    }
    console.log('translateLeft: ', translateLeft.value);
    repetetimeout(milliseconds)
  }, ms, repete, ms + 500)
}

repete(2000)

onDeactivated(() => {
  timer = null
  repete = null
})

onBeforeUnmount(() => {
  timer = null
  repete = null
})
</script>

<template>
  <div class="relative w-full max-w-lg">
    <div
      :class="`anim-blob top-0 -left-4 bg-purple-300 motion-reduce:transition transition-transform duration-2000 ${translateLeft} ease-in-out`">
    </div>
    <div
      :class="`anim-blob top-0 -right-4 bg-yellow-300 motion-reduce:transition transition-transform duration-2000 ${translateRight} ease-in-out`">
    </div>
    <div
      :class="`anim-blob -bottom-8 left-20 bg-pink-300 motion-reduce:transition transition-transform duration-2000 ${translateTop}  ease-in-out`">
    </div>
    <div class=" m-8 relative space-y-4">
      <slot></slot>
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
