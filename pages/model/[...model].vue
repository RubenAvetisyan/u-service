<script setup>
import { storeToRefs } from 'pinia'
/* eslint-disable no-console */

const route = useRoute()
const { links } = storeToRefs(useNotionStore())

definePageMeta({
  key: route => route.fullPath,
})

const title = useTitle()

const name = route?.params?.model?.length ? route?.params?.model[0] : ''
const model = name.replace(/[-\s]/g, ' ') || ''

useHead({
  title: model.toLocaleUpperCase(),
})
</script>

<template>
  <div class="content-background w-full h-full">
    <content-model :model="title" />
  </div>
</template>

<style>
#__nuxt>div {
  background-color: #fff;
}
</style>
