<script setup>
/* eslint-disable no-console */
import { storeToRefs } from 'pinia'

const scrollDown = useChevronScrollDown()

const route = useRoute()

let path = ''

const notionStore = useNotionStore()

const getService = notionStore.getServiceByPath

let link = ref(null)

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
let linkServicesLength = ref(0)

// const isLastItem = (i = 0, obj = {}) => i + 1 >= useObjcectLength(obj)

watch(() => route.path, async (n, o) => {
  if (n === '/') return
  path = useGetLastParam('model')

  if (path) {
    link.value = getService(path)
    useMyBackgroundImg()
  }

  isLinkServices = computed(() => {
    const result = isLinks(link.value?.services || {})


    return result
  })

  if (isLinkServices.value) linkServicesLength.value = useObjcectLength(link.value?.services)
}, { immediate: true })
</script>

<template>
  <div class="model">
    <div class="relative snap-start h-screen w-full pt-[calc(13vh+3.375rem)] place-content-center">
      <div id="main-content" class="model-main-content">
        <NuxtPage class="model-nuxt-page" />

        <h2 class="model-main-content-h2">
          Պատվիրել Online՝
          <content-anim-link>Անհպում մատակարարում</content-anim-link>
        </h2>
      </div>

      <div class="model-content-btn-container">
        <content-btn dark @click="showModal">
          ԱՆՀԱՏԱԿԱՆ ՊԱՏՎԵՐ
        </content-btn>
        <content-btn @click.stop="$router.replace('/')">
          Առկա ծառայություններ
        </content-btn>
      </div>
      <div class="h-full"></div>

      <content-chevron-down v-if="isLinkServices" class="model-content-chevron" :fn="scrollDown('#contents')" />
    </div>

    <div v-if="isLinkServices" id="contents" class="relative">
      <content-model-content
        v-for="({ name = '', imgUrl = '', itemClass = '', path: subPath = '/', description = '' }, id, i) in link.services"
        :id="`content-${i}`" :key="generatedKey(`${name}-${id}`)" :item-class="itemClass" :item-key="i"
        :img-url="imgUrl" :last-item="i + 1 >= linkServicesLength" class="model-contents-container">
        <template #btn>
          <r-home-menu :key="`service-block-${path.replace(/\//g, '')}`" color="bg-[#181a1f]" routes-prefix="model"
            :path="`/${path}${subPath}`" textMargine='mt-3' class="model-contents-home-menu">
            <span class="model-home-menu-first-span"> {{ name }}</span>
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
