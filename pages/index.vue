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

useHead({
  title: 'Home',
  link: linkRels.value,
})
</script>

<template>
  <div class="h-[87vh] justify-between w-full flex x-overflow-hidden items-center mt-[13vh]">
    <Suspense>
      <div class="snap-start h-full w-full items-center">
        <div v-if="links" class="flex flex-wrap items-center mx-auto w-full pt-15 gap-3">
          <r-home-menu v-for="({ path = '/', splitedName = '', imgUrl = '' }, key) in links"
            :key="`service-block-${splitedName.join('-')}-${key}`" routes-prefix="model" :path="path"
            icon="/U-Service.png" :background="imgUrl" color="bg-[#181a1f]"
            class="flex mx-auto w-40 h-40 ma-2 pa-4 rounded-full">
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
