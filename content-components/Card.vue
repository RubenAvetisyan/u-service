<script setup>
defineProps({
  src: {
    type: String,
    default: '',
  },
  firstLine: {
    type: String,
    default: '',
  },
  secondLine: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div v-if="!!firstLine || !!secondLine || !!src" class="flex items-center">
    <img v-if="!!src" :src="src" class="w-8 aspect-square" style="min-width: 32px; max-height: 32px;">
    <div v-if="!!firstLine || !!secondLine">
      <p v-if="!!firstLine" class="font-semibold">
        {{ firstLine }}
      </p>
      <span v-if="!!secondLine" class="text-sm">{{ secondLine }}</span>
    </div>
  </div>
</template>
