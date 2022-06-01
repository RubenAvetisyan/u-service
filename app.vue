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
    //   console.log('response: ', response)
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

  console.log('notion.value.childeServices: ', notion.value.childeServices);
  notionStore.setChildeServices(notion.value.childeServices, notion.value.links)
}

// When query string changes, refresh
watch(() => route.path, async (newPath, oldPath) => {
  try {
    console.log('new path: ', newPath, 'old path: ', oldPath)

    const isSame = newPath === oldPath || newPath === '/' || !!services

    if (isSame)
      return

    name = useGetLastParam('model')
    const service = notionStore.getServiceByPath(name)

    // if (service)
    //   return

    // const noChildeServices = !useObjcectLength(service?.services || {})
    // if (noChildeServices)
    //   return

    url.value = `/api/services/${name ? `${name}${notionStore.setQuery()}` : ''}`

    // params = notionStore.setQuery()

    services = await notionFetch(
      url.value, {
        lazy: false,
        // transform: (response) => {
        //   console.log('response: ', response)
        //   return response
        // },
      })

    // if (error.value) {
    //   useErrorHandler(error.value)
    //   return
    // }

    isPending.value = pending

    console.log('services: ', services)
    await useSetLinks(services, url.value)
    

    // When query string changes, refresh
    console.log('services?.childeServices: ', services?.childeServices);
    if (services?.childeServices?.length){
      notionStore.setChildeServices([services.childeServices], services.links)
      console.log('childeServices: ', notionStore.getChildeServices)
    }

    services = null
      
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
    {{ name || 'home' }}
    <NuxtPage />
    <!-- END MAIN -->

    <!-- FOOTER -->
    <!-- <template #footer>{{ route.fullPath }}</template> -->
    <!-- END FOOTER -->
  </NuxtLayout>
</template>
