<script setup>
/* eslint-disable no-console */
const route = useRoute()

definePageMeta({
  keepalive: true,
})

const links = useNavigationLinks()

const services = links.value.find(({ path }) => path.includes(route?.params?.model[0]))?.services

const sv = await $fetch('/api/services', {
  body: {
    services,
  },
})

const scrollDown = selector => useScrollIntoParentNextSiblingElement(selector)
</script>

<template>
  <div class="h-screen justify-between pb-13.75 flex flex-col items-center">
    <div class="snap-start h-screen pt-[calc(13vh+20px)]">
      <div class="text-center">
        <NuxtPage class="w-full mx-auto justify-center items-center" />

        <h2 class="font-light tracking-wider text-[#5c5d61] text-3.5 pb-2">
          Պատվիրել Online՝
          <content-anim-link>Անհպում մատակարարում</content-anim-link>
        </h2>
      </div>
      <div
        class="flex flex-col md:flex-row place-items-center text-center items-center justify-center md:space-x-6.25 space-y-5.5 md:space-y-0 mt-4"
      >
        <content-btn dark>ԱՆՀԱՏԱԿԱՆ ՊԱՏՎԵՐ</content-btn>
        <content-btn >Առկա ծառայություններ</content-btn>
      </div>
      <content-chevron-down
        @click="() => scrollDown('#contents')"
        class="mt-[50vh] md:mt-[65vh] mb-[6vh]"
      ></content-chevron-down>

      <div id="contents">
        <div
          v-for="(item, i) in ['bg-blue-100', 'bg-blue-200', 'bg-blue-300']"
          :key="item"
          :id="`content-${i}`"
          :class="`snap-start h-screen w-[calc(100vw-17px)] ${item} flex text-center items-center justify-center`"
        >
          <span :class="`flex h-screen pt-[calc(13vh+20px)] mx-auto p-4`">{{sv[i].name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
