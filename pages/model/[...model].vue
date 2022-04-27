<script setup>
import { useNavigationLinks } from '~~/composables/states'
/* eslint-disable no-console */

const route = useRoute()
const links = useNavigationLinks()

definePageMeta({
  key: route => route.fullPath,
})

const findImgUrl = (match) => {
  const res = links.value.find(({ path }) => {
    console.log('path: ', path, path.includes(match))
    return path.includes(match)
  })

  return res?.imgUrl
}

let imgUrl = ref('')
const model = route?.params?.model[0]?.replace(/[-\s]/g, ' ') || ''
console.log('model: ', model)

computed({
  bgImg() {
    return {
      '--bg-img': imgUrl.value,
    }
  },
})

imgUrl = findImgUrl(route?.params?.model[0])
console.log('imgUrl: ', imgUrl)

useMeta({
  title: model.toLocaleUpperCase(),
  style: { type: 'text/css', children: `#__nuxt > div {background-image: url('${imgUrl}');}` },
})

</script>

<template>
  <div class="content-background w-full h-full">
    <content-model :model="$route.params.model[0]"></content-model>
  </div>
</template>

<style>
#__nuxt > div {
  background-color: #fff;
}
</style>
