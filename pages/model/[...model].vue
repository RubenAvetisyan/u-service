<script setup>
import { storeToRefs } from 'pinia'
/* eslint-disable no-console */

const route = useRoute()
const { links } = storeToRefs(useNotionStore())

definePageMeta({
  key: route => route.fullPath,
})

const title = ref('')

const model = ref('')
if (process.client) {
  const notionStore = useNotionStore()

  const name = useGetFirstParam('model')
  title.value = notionStore.getServiceByPath(name)?.name || ''
  model.value = name.replace(/[-\s]/g, ' ') || ''
}

useHead({
  title: model.value.toLocaleUpperCase(),
})
</script>

<template>
  <div class="content-background w-full h-full">
    <content-model :model="title" />
  </div>
</template>
