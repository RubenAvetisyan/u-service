<script setup>
/* eslint-disable no-console */
const fpCover = useFpCover()
const backgroundImg = fpCover.value
useMeta({
  title: 'Home',
  style: [
    {
      type: 'text/css',
      children: `#__nuxt>div {background-image: url(${backgroundImg}); background-position: center; background-size: cover;}`,
    },
  ],
})

const links = useNavigationLinks()
</script>

<template>
  <div class="h-[87vh] justify-between w-full flex x-overflow-hidden items-center mt-[13vh]">
    <div class="snap-start h-full w-full items-center">
      <div v-if="links" class="flex flex-wrap items-center mx-auto w-full pt-15">
        <r-home-menu v-for="({ path = '/', splitedName = '' }) in links"
          :key="`service-block-${splitedName.join('-')}`"
          routes-prefix="/model"
          :path="path"
          color="red-600"
          icon="/tesla-svgrepo-com.svg"
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
  </div>
</template>
