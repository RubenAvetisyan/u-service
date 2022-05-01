<script setup>
import { useNavigationLinks } from '~~/composables/states'
/* eslint-disable no-console */

const route = useRoute()
const links = useNavigationLinks()
console.log('links: ', links.value)

definePageMeta({
  key: route => route.fullPath,
})

const findLink = (match) => {
  const res = links.value.find(({ path }) => {
    return path.includes(match)
  })

  return res || null
}

const imgUrl = ref('')
const title = ref('')
const model = route?.params?.model[0]?.replace(/[-\s]/g, ' ') || ''
console.log('model: ', model)

computed({
  bgImg() {
    return {
      '--bg-img': imgUrl.value,
    }
  },
})

const link = findLink(route?.params?.model[0])

imgUrl.value = link?.imgUrl

title.value = link?.name || ''

useMeta({
  title: model.toLocaleUpperCase(),
  style: { type: 'text/css', children: `#__nuxt > div {background-image: url('${imgUrl.value}');}` },
})

</script>

<template>
  <div class="content-background w-full h-full">
    <content-model :model="title"></content-model>
  </div>
</template>

<style>
#__nuxt>div {
  background-color: #fff;
}
</style>
