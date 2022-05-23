<script setup>
/* eslint-disable no-console */
import { storeToRefs } from 'pinia'

const route = useRoute()
const path = route?.params?.model?.length ? route.params.model[0] : ''
console.log('path: ', path)

const notionStore = useNotionStore()
const { links, currentLink } = storeToRefs(notionStore)
console.log('currentLink: ', currentLink.value)

const link = reactive(currentLink.value)

watch(() => link.value, (n, o) => {
  console.log('new link, old link: ', n, o)
}, { deep: true, immediate: true })

const generatedKey = str => useGeneratedKey(str)

const linkRels = useLinkMeta()

useHead({
  link: linkRels.value,
})

const scrollDown = selector => useScrollIntoParentNextSiblingElement(selector)

const isModal = ref(false)

const showModal = () => isModal.value = !isModal.value

const isLinks = obj => !!useObjcectLength(obj)
const isLastItem = (i = 0, obj = {}) => i + 1 >= useObjcectLength(obj)
</script>

<template>
  <div class="h-screen justify-between pb-13.75 flex flex-col items-center">
    <div class="snap-start h-screen pt-[calc(13vh+20px)]">
      <div v-if="isLinks(links || {})" id="main-content" class="text-center">
        <NuxtPage class="w-full mx-auto justify-center items-center" />

        <h2 class="font-light tracking-wider text-[#5c5d61] text-3.5 pb-2">
          Պատվիրել Online՝
          <content-anim-link>Անհպում մատակարարում</content-anim-link>
        </h2>
      </div>
      <pre>{{ link }}</pre>
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
        v-if="isLinks(link?.services || {})" class="mt-[50vh] md:mt-[55vh] lg:mt-[65vh] xl:mt-[55vh] mb-[6vh]"
        @click="() => scrollDown('#contents')"
      />

      <div v-if="isLinks(link?.services || {})" id="contents">
        <div
          v-for="({ name = '', imgUrl = '', itemClass = '', path = '/', order }, id) in link.services"
          :id="`content-${id}`" :key="generatedKey(`${name}-${id}`)" :style="`background-image: url('${imgUrl}');`"
          class="snap-start h-screen w-screen relative bg-cover bg-fixed bg-center flex text-center items-center justify-center" :class="[itemClass]"
        >
          <div class="flex mx-4 items-center justify-center h-10 text-center content-center">
            <r-home-menu
              :key="`service-block-${path.replace(/\//g, '')}`" color="bg-[#181a1f]" routes-prefix="model"
              :path="path"
              class="flex mx-auto text-light-blue-100 hover:text-light-100 bg-opacity-50 h-20 w-80 ma-2 rounded-xl align-center justify-center"
            >
              <span
                class="bg-clip-text font-bold font-bold tracking-wider text-size-[0.95rem] leading-[1.15] py-1 capitalize mw-auto px-1"
              >
                {{ name || `some name ${id}` }}</span>
            </r-home-menu>
          </div>
          {{ isLastItem(order, link?.services) }} {{ order }}
          <content-chevron-down
            class="mt-[50vh] md:mt-[65vh] mb-[6vh] absolute rounded-full mx-auto" :class="[isLastItem(order, link?.services) ? 'rotate-180' : null]"
            @click="() => scrollDown(!isLastItem(order, link?.services) ? `#content-${id}` : '#main-content')"
          />
        </div>
      </div>

      <!-- MODAL -->
      <content-form-custom-order :show="isModal" :on-submit="showModal" :on-cancel="showModal" />
    </div>
  </div>
</template>
