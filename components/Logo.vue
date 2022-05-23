<script setup>
/* eslint-disable no-console */
const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  width: {
    type: Number,
    default: 48,
  },
  color: {
    type: String,
    default: '#171a20',
  },
})

const { width: w } = props

// const max = `max-w-${w / 4} max-h-${(w - (w * 75 / 100)) / 4}`
// const min = `min-w-${w / 4} min-h-${(w - (w * 75 / 100)) / 4}`
// const dimms = `w-${w / 4} h-${(w - (w * 75 / 100)) / 4}`
</script>

<template>
  <nuxt-link
    to="/"
    class="flex md:mx-auto justify-center items-center w-2/4 h-2/4 md:w-2/4 md:h-2/4"
  >
    <slot v-if="$slots.img" name="img" />
    <!-- <img
    v-if="!$slots.img"
      class="cursor-pointer bg-contain"
      src="/RUBEN_LOGO.svg"
    /> -->
    <svg
      v-else
      class="bg-cover overflow-hidden"
      clip-rule="evenodd"
      fill-rule="evenodd"
      image-rendering="optimizeQuality"
      shape-rendering="geometricPrecision"
      text-rendering="geometricPrecision"
      viewBox="0 0 21 29.7"
      xml:space="preserve"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.5289 15.7085v-1.7583c.0534-.2525.313-.4386.5572-.4851V16.236h-3.002l-.0069-.001-.0043.001V13.465c.2443.0465.5038.2326.5573.485v1.7584h1.8987zm-4.9356-.5867.368.7144c.173.2238.488.292.7197.2303l-.4915-.9543c.2563-.0675.443-.3027.4915-.5247v-.588c-.0499-.2343-.2495-.4832-.5205-.5344H-.0071c.0586.2342.2634.4758.5417.5344h1.612v.588H-.007v1.479h.5343v-.9447h1.0661zm10.3101.0024h-.4519v.5346h.452v-.5346zm-.3413-1.0333h-.452v.6543h.452v-.6543zm-2.1372 1.0333h.9755v-.5275H8.8902c.0578.2313.2601.477.5347.5275zm.6968 1.062h1.2542c.2746-.0505.4769-.2962.5275-.5274H10.1217v.5275zm.9662-2.6228h-.9663v.5275H8.89h2.672c-.0512-.2313-.2306-.4697-.4741-.5275zm-1.7237.5275h.9663v-.5275H8.89c.0513.2312.2307.4697.4742.5275zm.0001 2.0954h.9663v-.5275H8.8901c.0513.2312.2307.4697.4742.5275zm2.0044-1.5896h-.9755v.5274h1.5102c-.0578-.2312-.2601-.4769-.5347-.5274zm2.729-.506h1.951c.2745-.0506.4768-.2963.5274-.5275H13.563c.0578.2312.2601.4697.5347.5275zm0 1.0333h1.951c.2745-.0506.4768-.2962.5274-.5275H13.563c.0578.2313.2601.4697.5347.5275zm0 1.0622h1.951c.2745-.0505.4768-.2962.5274-.5275H13.563c.0578.2313.2601.477.5347.5275zm6.338-.9367-1.6132-1.7322V14.442l1.6131 1.743v-.9355zm-1.6132.4632v-2.1954l-.5572.0007v2.6682c.2443-.0512.4961-.2303.5572-.4735zm1.6131.4723v-2.203c.0535-.2432.313-.4224.5573-.4672v2.6682l-.5573.002z"
        :fill="`${color}`"
        fill-rule="nonzero"
      />
    </svg>

    <!-- <svg
      v-if="!$slots.img"
      :class="['cursor-pointer bg-contain']"
      viewBox="0 0 342 35"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 .1a9.7 9.7 0 007 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 007-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 006-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 00-8.7 7h39.9v-21h-31.2v-7h24zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 007.1-7H78.3a9.6 9.6 0 007 7zm0 13.8h26a9.6 9.6 0 007.1-7H78.3a9.6 9.6 0 007 7zm0 14.1h26a9.6 9.6 0 007.1-7H78.3a9.6 9.6 0 007 7zM308.5 7h26a9.6 9.6 0 007-7h-40a9.6 9.6 0 007 7z"
        fill="currentColor"
      />
    </svg> -->
  </nuxt-link>
</template>
