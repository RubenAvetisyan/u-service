<script setup>
/* eslint-disable no-console */
import { storeToRefs } from 'pinia'
const route = useRoute()

const notionStore = useNotionStore()
const { links } = storeToRefs(notionStore)

// const isPending = usePending()
// const fpCover = useFpCover()

useMyBackgroundImg()
const linkRels = useLinkMeta()

const sliderSrc = Object.values(links.value).map(({ imgUrl = '' }) => imgUrl).filter(s => s)

useHead({
  title: 'Home',
  link: linkRels.value,
})
</script>

<template>
  <div class="relative snap-center h-full justify-between w-full x-overflow-hidden items-center px-2 md:px-4">
    <div class="fixed inset-0 min-h-screen flex items-center justify-center px-16</div>">
      <r-animation-blurry-shapes class="absolute z-0 top-1/2 " />
    </div>
    <RSlider :images="sliderSrc" class="absolute top-16" />
    <Suspense>
      <div class="flex snap-start w-full items-center pt-16 md:pt-0 md:mt-[18vh] lg:mt-[10vh]">
        <div v-if="links" class="flex flex-wrap items-center mx-auto w-full pt-15 gap-3">
          <r-home-menu v-for="({ path = '/', splitedName = '', imgUrl = '' }, key) in links"
            :key="`service-block-${splitedName.join('-')}-${key}`" routes-prefix="model" :path="path"
            icon="/U-Service.png" :background="imgUrl" color="bg-[#181a1f]"
            class="flex mx-auto w-40 h-40 mx-2 pa-2 rounded-3xl lg:rounded-full">
            <template #first-line>
              {{ splitedName[0] }}
            </template>
            <template #second-line>
              {{ splitedName[1] }}
            </template>
          </r-home-menu>
        </div>
      </div>
    </Suspense>
  </div>
</template>
