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
console.log('links: ', links)

let isLinks = !!useObjcectLength(links.value)

let isServices = false

const errorHandler = (error) => {
  if (process.client || process.window) {
    throwError(new Error(error))
    clearError()
  }
  else {
    console.error('ERROR MESSAGE while ftching data: ', error.value)
  }
}

let url = childeServices.value?.length ? `/services${notionStore.setQuery()}` : '/notion?fp=true'
const fetch = () => useAsyncData(
  'notion',
  () => notionFetch(url, { lazy: true }),
)

let services = null
const setLinks = (notionValue) => {
  console.log('notionValue: ', notionValue)
  if (url.includes('notion')) {
    notionStore.setMainServices(notionValue)
  }
  else {
    // links.value =
    notionStore.addServices(notionValue.links)
    console.log('links.value: ', links.value)
  }
}

if (!useObjcectLength(links.value)) {
  const { pending, data: notion, refresh, error } = await fetch()

  if (error.value)
    errorHandler(error.value)

  isPending.value = pending.value

  isServices = !!notion.value.childeServices.length

  fpCover.value = notion.value.cover
  console.log('url: ', url)

  setLinks(notion.value)
  console.log('links.value for First time: ', links.value)

  notionStore.setChildeServices(notion.value.childeServices)
  console.log('childeServices.value: ', childeServices.value)

  // When query string changes, refresh
  watch(() => childeServices.value, async (a, b) => {
    try {
      console.log('new childeServices: ', a, 'old childeServices: ', b)
      const noChildeServices = !a?.length
      if (noChildeServices)
        return

      const isSame = a?.join() === b?.join()
      if (isSame)
        return

      console.log('=== REFRESHING DATA ===')
      const query = a?.length ? `?db_id=${a.join('?db_id=')}` : ''
      console.log('query: ', query)

      url = `/services${query}`

      await refresh()

      if (error.value)
        errorHandler(error.value)

      isPending.value = pending

      // watch(() => childeServices.value, (a, b) => {
      //   console.log('old: ', a)
      //   console.log('new: ', b)
      //   // await refresh()
      // }, { deep: true })

      // console.log('links.value: ', links.value)

      services = notion.value

      setLinks(notion.value)

      // When query string changes, refresh
      if (notion?.value?.childeServices)
        notionStore.setChildeServices(notion.value.childeServices)
    }
    catch (error) {
      console.error('ERROR MESSAGE: ', error.message)
    }
  }, { deep: true, immediate: true })
}

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
    <NuxtPage />
    <!-- END MAIN -->

    <!-- FOOTER -->
    <!-- <template #footer>{{ route.fullPath }}</template> -->
    <!-- END FOOTER -->
  </NuxtLayout>
</template>
