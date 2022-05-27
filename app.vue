<script setup>
/* eslint-disable no-console */
import { storeToRefs } from 'pinia'

definePageMeta({
  layout: false,
  keepalive: true,
})

const isPending = usePending()
const fpCover = useFpCover()

const route = useRoute()
const model = route?.params?.model

watch(() => model, async (a, b) => {
  console.log('a, b: ', a, b)
})

const name = model?.length ? model[0] : ''

const store = useStore()
const { sidebarToggle } = store

const onClick = () => {
  sidebarToggle()
  useTimeoutFn(() => { useSidebarToggle() }, 500)
}

const notionStore = useNotionStore()
const { links, getChildeServices: childeServices } = storeToRefs(notionStore) // useNavigationLinks()

let isLinks = !!useObjcectLength(links.value)

let url = childeServices.value?.length ? `/services${name ? `${name}` : ''}` : '/notion?fp=true'

let services = null

const params = {}

const { pending, data: notion, refresh, error } = await useLazyAsyncData('notion', () => notionFetch(
  url, {
    lazy: true,
    // transform: (response) => {
    //   console.log('response: ', response)
    //   return response
    // },
  }))
// if (!useObjcectLength(links.value) && process.server) {

if (error.value)
  useErrorHandler(error.value)

isPending.value = pending.value
if(notion?.value){
  fpCover.value = notion.value?.cover

  useSetLinks(notion.value, url)

  notionStore.setChildeServices(notion.value.childeServices)
}

// When query string changes, refresh
watch(() => childeServices.value.join(), async (a, b) => {
  try {
    // console.log('new childeServices: ', a, 'old childeServices: ', b)
    const noChildeServices = !a
    if (noChildeServices)
      return

    const isSame = a === b
    
    if (isSame)
      return

    url = `/api/services/${name ? `${name}` : ''}${notionStore.setQuery()}`

    // params = notionStore.setQuery()

    services = await notionFetch(
      url, {
        lazy: false,
        // transform: (response) => {
        //   console.log('response: ', response)
        //   return response
        // },
      })

    if (error.value) {
      useErrorHandler(error.value)
      return
    }

    isPending.value = pending

    useSetLinks(services, url)

    // When query string changes, refresh
    if (notion?.value?.childeServices)
      notionStore.setChildeServices(notion.value.childeServices)
  }
  catch (error) {
    console.error('ERROR MESSAGE: ', error.message)
  }
}, { deep: true, immediate: true })
// }

isLinks = !!useObjcectLength(links.value)

const rightNavigation = [
  {
    path: 'about',
    name: 'Մեր մասին',
  },
  {
    path: 'user',
    name: 'Անձնական հաշիվ',
  },
  {
    path: '',
    name: 'Ծառայություններ',
    onClick,
  },
]
const generatedKey = str => useGeneratedKey(str)

useHead({
  titleTemplate: 'U-Servce - %s',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [
    { hid: 'description', name: 'description', content: `My page's ${name} description` },
  ],
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/U-Service.png',
    },
  ],
  htmlAttrs: {
    lang: 'hy'
  },
  bodyAttrs: {
    class:'overflow-y-hidden'
  }
})
</script>

<template>
  <NuxtLayout :name="$device.isDesktopOrTablet ? 'default' : 'mobile'">
    <Html lang="hy">
      <Head>
        <Meta name="description" :content="`My page's ${name} description`" />
      </Head>
    </Html>
    <!-- HEADER -->
    <template #logo>
      <r-logo :width="245" class="md:mt-0">
        <template #img>
          <img class="cursor-pointer bg-contain" src="/U-Service-full.png">
        </template>
      </r-logo>
    </template>

    <template #header-right>
      <r-top-navigation
        v-if="!$device.isMobile && isLinks" :routes="rightNavigation" :padding-r="32"
        class="text-light-100"
      />
      <!-- MOBILE BUTTON -->
      <r-link-button v-else class="text-light-100 bg-dark-50 mr-5" @click="onClick">
        Ծառայություններ
      </r-link-button>
    </template>
    <!-- END HEADER -->

    <!-- MAIN -->
    {{name || 'home'}}
    <NuxtPage />
    <!-- END MAIN -->

    <!-- FOOTER -->
    <!-- <template #footer>{{ route.fullPath }}</template> -->
    <!-- END FOOTER -->
  </NuxtLayout>
</template>
