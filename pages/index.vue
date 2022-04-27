<script setup>
/* eslint-disable no-console */
const fpCover = useFpCover()
const backgroundImg = fpCover.value
useMeta({
  title: 'Home',
  style: [
    {
      type: 'text/css',
      children: `#__nuxt > div {background-image: url(${backgroundImg})}`,
    },
  ],
})

const links = useNavigationLinks()

const scrollDown = (selector) => {
  // document.body.querySelector('#__nuxt > div').setAttribute('style', `background-image: url('${imgUrl}');background-repeat: no-repeat;`)
  useScrollIntoParentNextSiblingElement(selector)
}
</script>

<template>
  <div class="h-[87vh] justify-between w-full flex overflow-hidden items-center mt-[13vh]">
    <div class="snap-start h-full w-full items-center absolute">
      <div class="text-center">
        <content-model model="Ծառայությունների Ցանկ"></content-model>

        <h2 class="font-light tracking-wider text-[#5c5d61] text-3.5 pb-2">
          Պատվիրել Online՝
          <content-anim-link>Անհպում մատակարարում</content-anim-link>
        </h2>
      </div>

      <div class="flex mx-auto items-center justify-center space-x-6.25 mt-4">
        <content-btn dark>ԱՆՀԱՏԱԿԱՆ ՊԱՏՎԵՐ</content-btn>
        <content-btn >Առկա ծառայություններ</content-btn>
      </div>

      <div class="flex flex-wrap items-center mx-auto w-full pt-15">
        <r-home-menu v-for="({ path, splitedName }) in links" :key="`service-block-${splitedName.join('-')}`"
          routes-prefix="/model" :path="path" color="red" class="flex mx-auto w-40 h-40 ma-2 pa-4 rounded-full">
          <template #first-line>
            {{ splitedName[0] }}
          </template>
          <template #second-line>
            {{ splitedName[1] }}
          </template>
        </r-home-menu>
      </div>

    </div>
    <!-- <div id="contents" class="absolute top-0">
      <div :id="name.replace(/\s+/g, '')" v-for="({ imgUrl, path, name }, i) in links" :key="`service-block-${name}`"
        :class="`flex snap-start flex text-center items-center justify-center`"
        :style="`background-image: url('${imgUrl}');background-repeat: no-repeat center center;
        background-size: cover;`">
        <div class="bg-black bg-opacity-10 w-[50vw] h-[50vh] backdrop-blur-sm justify-center items-center align-middle">
          <span class="flex col mx-auto justify-center items-center align-middle">{{ name }}</span>
        </div>
          <content-chevron-down v-if="i + 1 <= links.length - 1"
            @click="() => scrollDown(`#${links[i + 1].name.replace(/\s+/g, '')}`, imgUrl)"
            class="absolute z-50 mt-[65vh] mb-[6vh] text-red">
          </content-chevron-down>
      </div>
    </div> -->
  </div>
</template>
