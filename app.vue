<script setup>
/* eslint-disable no-console */
import { storeToRefs } from 'pinia'
import DarkToggle from './components/DarkToggle.vue';

const nuxtApp = useNuxtApp()

definePageMeta({
  layout: false,
  keepalive: true,
})

const isPending = usePending()
const fpCover = useFpCover()

const route = useRoute()

let name = useGetFirstParam('model')

const store = useStore()
const { sidebarToggle } = store

const onClick = () => {
  sidebarToggle()
  useTimeoutFn(() => { useSidebarToggle() }, 500)
}

const notionStore = useNotionStore()
const { links, getChildeServices: childeServices } = storeToRefs(notionStore) // useNavigationLinks()

let isLinks = !!useObjcectLength(links.value)

const url = ref(name ? `/services/${name ? `${name}` : ''}` : '/notion?fp=true')

let services = null

const params = {}

const { pending, data: notion, refresh, error } = await useLazyAsyncData('notion', () => notionFetch(
  url.value, {
  lazy: true,
  // transform: (response) => {
  //   
  //   return response
  // },
}))
// if (!useObjcectLength(links.value) && process.server) {

if (error.value)
  useErrorHandler(error.value)

isPending.value = pending.value
if (notion?.value) {
  fpCover.value = notion.value?.cover

  useSetLinks(notion.value, url.value)


  notionStore.setChildeServices(notion.value.childeServices, notion.value.links)
}

// When query string changes, refresh
watch(() => route.path, async (newPath, oldPath) => {
  try {


    const isSame = newPath === oldPath || newPath === '/' || !!services

    if (isSame)
      return

    name = useGetLastParam('model')
    // const service = notionStore.getServiceByPath(name)

    // if (service)
    //   return

    // const noChildeServices = !useObjcectLength(service?.services || {})
    // if (noChildeServices)
    //   return

    url.value = `/api/services/${name ? `${name}${notionStore.setQuery()}` : ''}`

    // params = notionStore.setQuery()

    // When route.path string changes, fetching for new data 
    services = await notionFetch(
      url.value, {
      lazy: false,
      // transform: (response) => {
      //   
      //   return response
      // },
    })

    isPending.value = pending

    await useSetLinks(services, url.value)

    if (!services?.childeServices?.length) return

    notionStore.setChildeServices([services.childeServices], services.links)

    services = null

  }
  catch (error) {

  }
}, { deep: true, immediate: true })
// }

isLinks = !!useObjcectLength(links.value)

const { $device: device } = useNuxtApp()

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

const rn = computed(() => {
  return !device.isMobile ? rightNavigation : [{
    path: '',
    name: 'Ծառայություններ',
    onClick,
  }]
})
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
    lang: 'hy',
  },
  bodyAttrs: {
    class: 'overflow-y-hidden',
  },
})
</script>

<template>
  <NuxtLayout :name="$device.isDesktopOrTablet ? 'default' : 'mobile'">
    <!-- <Html lang="hy">
      <Head>
        <Meta name="description" :content="`My page's ${name} description`" />
      </Head>
    </Html> -->
    <!-- HEADER -->
    <template #logo>
      <r-logo :width="245" class="md:mt-0">
        <template #img>
          <img class="cursor-pointer bg-contain" src="/U-Service-full.png">
        </template>
      </r-logo>
    </template>

    <template #header-right>
      <r-top-navigation v-if="isLinks" :routes="rn" :padding-r="32" class="dark:text-light-100 text-dark-100" />
      <!-- MOBILE BUTTON -->
      <!-- <r-link-button v-else class="dark:text-light-100 text-dark-100 bg-dark-50 mr-5" @click="onClick">
        Ծառայություններ
      </r-link-button> -->
    </template>

    <template #color-mode>
      <DarkToggle class="w-6 min-w-6" />
    </template>
    <!-- END HEADER -->

    <!-- MAIN -->
    <NuxtPage />
    <!-- END MAIN -->

    <!-- FOOTER -->
    <!-- <template #footer>{{ route.fullPath }}</template> -->
    <!-- END FOOTER -->
  </NuxtLayout>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
