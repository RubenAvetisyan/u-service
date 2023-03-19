<script setup>
/* eslint-disable no-console */
const links = useNavigationLinks()
const isLinks = useObjcectLength(links.value)
useMyBackgroundImg()
const linkRels = useLinkMeta()

useHead({
  title: 'Home',
  link: linkRels.value,
})
</script>

<template>
    <div class="h-[87vh] justify-between w-full flex x-overflow-hidden items-center mt-[13vh]">
      <div class="snap-start h-full w-full items-center">
        <div v-if="isLinks" class="flex flex-wrap items-center mx-auto w-full pt-15 gap-3">
          <r-home-menu v-for="({ path = '/', splitedName = '' }) in Object.values(links)"
            :key="`service-block-${splitedName.join('-')}`" routes-prefix="model" :path="path" color="bg-[#181a1f]"
            icon="/U-Service.png" class="flex mx-auto w-40 h-40 ma-2 pa-4 rounded-full">
            <template #first-line>
              {{ splitedName[0] }}
            </template>
            <template #second-line>
              {{ splitedName[1] }}
            </template>
          </r-home-menu>
        </div>
      </div>
  </div>
</template>
