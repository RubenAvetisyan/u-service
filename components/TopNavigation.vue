<script setup>
const props = defineProps({
  routesPrefix: {
    type: String,
    default: '',
  },
  routes: {
    type: Array,
    default: () => ([]),
  },
  paddingX: {
    type: Number,
    default: 8,
  },
  center: {
    type: Boolean,
    default: false,
  },
  paddingR: {
    type: [Number],
    defaulr: 0,
  },
})

const ulPaddingX = ref(`px-${props.paddingX}px`)
const ulPaddingR = props.paddingR ? ref(`pr-${props.paddingR}px`) : null
const generatedKey = str => useGeneratedKey(str)

const { baseUrl } = useRuntimeConfig()

const loading = useLoading()

const refreshLoading = () => {
  loading.value = true
}
</script>

<template>
  <ul
    :class="['flex items-center text-[#181b21]', center ? 'mx-auto' : null, ulPaddingR || ulPaddingX]"
  >
    <li
      v-for="({ path = '', name = '', onClick = null, style = null }, i) in routes"
      :key="generatedKey(`${name}-${i}`)"
    >
      <r-link-button v-if="onClick" @click.stop="onClick">{{ name }}</r-link-button>
      <r-link-button v-else="onClick" :path="`${baseUrl}${path ? routesPrefix : ''}${path}`" @click="refreshLoading">{{ name }}</r-link-button>
    </li>
  </ul>
</template>
