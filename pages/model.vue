<script setup>
/* eslint-disable no-console */
import { storeToRefs } from 'pinia'

const route = useRoute()

let path = ''

const notionStore = useNotionStore()

let getService = notionStore.getServiceByPath


let link = null

const generatedKey = str => useGeneratedKey(str)

const linkRels = useLinkMeta()

useHead({
  link: linkRels.value,
})

const scrollDown = selector => useScrollIntoParentNextSiblingElement(selector)

const isModal = ref(false)

const showModal = () => isModal.value = !isModal.value

const isLinks = obj => {
  const result = !!useObjcectLength(obj)
  console.log('result: ', result);

  return result
}

let isLinkServices = null

const isLastItem = (i = 0, obj = {}) => i + 1 >= useObjcectLength(obj)


watch(() => route.path, async (n, o) => {
  console.log('new link, old link: ', n, o)
  path = useGetLastParam('model')
  console.log('path: ', path)

  getService = notionStore.getServiceByPath
  if(path) {
    link = computed(()=>getService(path))
    useMyBackgroundImg()
  }

  console.log('link: ', link);

  isLinkServices = computed(() => {
    const result = isLinks(link?.services || {})
    console.log('isLinkServices: ', result);

    return result
  })
}, { immediate: true })
</script>

<template>
  <div class="h-screen justify-between pb-13.75 flex flex-col items-center">
    <div class="snap-start h-screen pt-[calc(13vh+20px)]">
      <div id="main-content" class="text-center">
        <NuxtPage class="w-full mx-auto justify-center items-center" />

        <h2 class="font-light tracking-wider text-[#5c5d61] text-3.5 pb-2">
          Պատվիրել Online՝
          <content-anim-link>Անհպում մատակարարում</content-anim-link>
        </h2>
      </div>
      
      <div
        class="flex flex-col md:flex-row place-items-center text-center items-center justify-center md:space-x-6.25 space-y-5.5 md:space-y-0 mt-4"
      >
        <content-btn dark @click="showModal">
          ԱՆՀԱՏԱԿԱՆ ՊԱՏՎԵՐ
        </content-btn>
        <content-btn @click.stop="$router.replace('/')">
          Առկա ծառայություններ
        </content-btn>
      </div>
      <content-chevron-down
        v-if="isLinkServices" class="mt-[50vh] md:mt-[55vh] lg:mt-[65vh] xl:mt-[55vh] mb-[6vh]"
        @click="() => scrollDown('#contents')"
      />

      <div v-if="isLinkServices" id="contents">
        <div
          v-for="({ name = '', imgUrl = '', itemClass = '', path: subPath = '/', order }, id, i) in link.services"
          :id="`content-${i}`" :key="generatedKey(`${name}-${id}`)" :style="`background-image: url('${imgUrl}');`"
          class="snap-start h-screen w-screen relative bg-cover bg-fixed bg-center flex text-center items-center justify-center" :class="[itemClass]"
        >
          <div class="flex mx-4 items-center justify-center h-10 text-center content-center">
            <r-home-menu
              :key="`service-block-${path.replace(/\//g, '')}`" color="bg-[#181a1f]" routes-prefix="model"
              :path="`/${path}${subPath}`"
              class="flex mx-auto text-light-blue-100 hover:text-light-100 bg-opacity-50 h-20 w-80 ma-2 rounded-xl align-center justify-center"
            >
              <span
                class="bg-clip-text font-bold font-bold tracking-wider text-size-[0.95rem] leading-[1.15] py-1 capitalize mw-auto px-1"
              >
                {{ name || `some name ${id}` }}</span>
            </r-home-menu>
          </div>
          
          <content-chevron-down
            class="mt-[50vh] md:mt-[65vh] mb-[6vh] absolute rounded-full mx-auto" :class="[isLastItem(i, link?.services) ? 'rotate-180' : null]"
            @click="() => scrollDown(!isLastItem(i, link?.services) ? `#content-${i+1}` : '#main-content')"
          />
        </div>
      </div>

      <!-- MODAL -->
      <content-form-custom-order :show="isModal" :on-submit="showModal" :on-cancel="showModal" />
    </div>
  </div>
</template>
