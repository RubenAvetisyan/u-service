<script setup>
/* eslint-disable no-console */
import { storeToRefs } from 'pinia'

const scrollDown = useChevronScrollDown()

const route = useRoute()

let path = ''

const notionStore = useNotionStore()

const getService = notionStore.getServiceByPath

const link = ref(null)

const generatedKey = str => useGeneratedKey(str)

const linkRels = useLinkMeta()

useHead({
  link: linkRels.value,
})

const isModal = ref(false)

const showModal = () => isModal.value = !isModal.value

const isLinks = (obj) => {
  const result = !!useObjcectLength(obj)

  return result
}

let isLinkServices = null
const linkServicesLength = ref(0)

// const isLastItem = (i = 0, obj = {}) => (i + 1) >= useObjcectLength(obj)

watch(() => route.path, async (n, o) => {
  if (n === '/')
    return
  path = useGetLastParam('model')

  if (path) {
    link.value = getService(path)
    useMyBackgroundImg()
  }

  isLinkServices = computed(() => {
    const result = isLinks(link.value?.services || {})

    return result
  })

  if (isLinkServices.value)
    linkServicesLength.value = useObjcectLength(link.value?.services)
}, { immediate: true })
</script>

<template>
  <div class="h-screen justify-between pb-13.75 items-center">
    <div class="relative snap-start h-screen w-full pt-[calc(13vh+3.375rem)] place-content-center">
      <div id="main-content" class="mx-auto text-center items-center justify-center">
        <NuxtPage class="w-full mx-auto justify-center items-center" />

        <h2
          class="max-w-lg mx-auto font-normal backdrop-blur-sm rounded-lg tracking-wider text-light-100 light:text-dark-100 text-3.5 pb-2">
          Պատվիրել Online՝
          <content-anim-link>Անհպում մատակարարում</content-anim-link>
        </h2>
      </div>

      <div
        class="flex flex-wrap mx-auto max-w-sm md:max-w-xl items-center justify-around space-x-3.25 md:space-x-6.25 space-y-5.5 md:space-y-0 mt-4 h-40 md:h-20">
        <content-btn dark @click="showModal">
          ԱՆՀԱՏԱԿԱՆ ՊԱՏՎԵՐ
        </content-btn>
        <content-btn @click.stop="$router.replace('/')">
          Առկա ծառայություններ
        </content-btn>
      </div>
      <div class="h-full" />

      <content-chevron-down v-if="isLinkServices" class="absolute bottom-[1rem] inset-x-0"
        :fn="scrollDown('#contents')" />
    </div>

    <div v-if="isLinkServices" id="contents" class="relative">
      <content-model-content
        v-for="({ name = '', imgUrl = '', itemClass = '', path: subPath = '/', description = '' }, id, i) in link.services"
        :id="`content-${i}`" :key="generatedKey(`${name}-${id}`)" :item-class="itemClass" :item-key="i"
        :img-url="imgUrl" :last-item="(i + 1) >= linkServicesLength"
        class="relative snap-start h-full md:h-screen w-screen relative bg-cover bg-fixed bg-center flex flex-col text-center items-center justify-center px-4 place-content-center">
        <template #btn>
          <r-home-menu :key="`service-block-${path.replace(/\//g, '')}`" color="bg-[#181a1f]" routes-prefix="model"
            :path="`/${path}${subPath}`" text-margine="mt-3"
            class="flex mx-auto text-light-blue-100 hover:text-light-100 bg-opacity-50 h-20 w-80 ma-2 rounded-xl align-center justify-center">
            <span
              class="text-light-100 text-sm font-medium text-light-300 group-hover:text-light-600 group-hover:dark:text-dark-600 dark:text-light-400">
              {{ name }}</span>
          </r-home-menu>
        </template>

        <template #description>
          <div>
            <content-model-description v-for="(text, di) in description.split(/[\.:]/g).filter(s => s)"
              :key="`${id}-description-${di}`">
              {{ text }}
            </content-model-description>
          </div>
        </template>
      </content-model-content>
    </div>

    <!-- MODAL -->
    <content-form-custom-order :show="isModal" :on-submit="showModal" :on-cancel="showModal" />
  </div>
</template>
