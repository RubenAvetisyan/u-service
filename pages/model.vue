<script setup>
/* eslint-disable no-console */

const links = useNavigationLinks()

const generatedKey = str => useGeneratedKey(str)

const link = ref({})
link.value = useFindLink()

const linkRels = useLinkMeta()

useMeta({
  link: linkRels.value,
})

const bgImg = imgUrl => `bg-[url('${imgUrl}')`

const scrollDown = selector => useScrollIntoParentNextSiblingElement(selector)

</script>

<template>
  <div class="h-screen justify-between pb-13.75 flex flex-col items-center">
    <div class="snap-start h-screen pt-[calc(13vh+20px)]">
      <div id="main-content" v-if="links.length" class="text-center">
        <NuxtPage class="w-full mx-auto justify-center items-center" />

        <h2 class="font-light tracking-wider text-[#5c5d61] text-3.5 pb-2">
          Պատվիրել Online՝
          <content-anim-link>Անհպում մատակարարում</content-anim-link>
        </h2>
      </div>
      <div
        class="flex flex-col md:flex-row place-items-center text-center items-center justify-center md:space-x-6.25 space-y-5.5 md:space-y-0 mt-4">
        <content-btn dark>ԱՆՀԱՏԱԿԱՆ ՊԱՏՎԵՐ</content-btn>
        <content-btn>Առկա ծառայություններ</content-btn>
      </div>
      <content-chevron-down @click="() => scrollDown('#contents')" class="mt-[50vh] md:mt-[65vh] mb-[6vh]">
      </content-chevron-down>

      <div v-if="link.services?.length" id="contents">
        <div v-for="({ name='', imgUrl='', itemClass = '', path = '/' }, i) in link.services"
          :key="generatedKey(name + '-' + i)" :id="`content-${i}`" :style="`background-image: url('${imgUrl}');`"
          :class="[bgImg, 'snap-start h-screen w-screen relative bg-cover bg-fixed bg-center', itemClass, 'flex text-center items-center justify-center']">
          <div class="flex mx-4 items-center justify-center h-10 text-center content-center">
            <r-home-menu :key="`service-block-${path.replace(/\//g, '')}`" color="bg-[#181a1f]" routes-prefix="model"
              :path="path"
              class="flex mx-auto text-light-blue-100 hover:text-light-100 bg-opacity-50 h-20 w-80 ma-2 rounded-xl align-center justify-center">
              <span
                :class="['bg-clip-text font-bold font-bold tracking-wider text-size-[0.95rem] leading-[1.15] py-1 capitalize mw-auto px-1']">
                {{ name || `some name ${i}` }}</span>
            </r-home-menu>

          </div>
          <content-chevron-down
            @click="() => scrollDown(i + 1 < link.services.length ? `#content-${i + 1}` : '#main-content')"
            :class="['mt-[50vh] md:mt-[65vh] mb-[6vh] absolute', i + 1 >= link.services.length ? 'rotate-180' : null]">
          </content-chevron-down>
        </div>
      </div>
    </div>
  </div>
</template>
