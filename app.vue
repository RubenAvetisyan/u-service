<script setup>
/* eslint-disable no-console */
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

const sidebar = useSidebar()

const onClick = () => {
  sidebar.value = !sidebar.value
  useTimeoutFn(() => useSidebarToggle(), 250)
}

const links = useNavigationLinks()

let isLinks = useObjcectLength(links.value)

let isServices = false

const childeServices = useChildeServices()

const errorHandler = (error) => {
  if (process.client || process.window) {
    throwError(new Error(error))
    clearError()
  }
  else {
    console.error('ERROR MESSAGE while ftching data: ', error.value)
  }
}

let url = childeServices.value.length ? `/services?db_id=${childeServices.value.join('?db_id=')}` : '/notion?fp=true'
const fetch = () => useAsyncData(
  'notion',
  () => notionFetch(url, { lazy: true }),
)

const setLinks = (notionValue) => {
  if (url.includes('notion'))
    useNotionLinks(notionValue)
  else
    useServicesCall(notionValue?.links || null, links)
}

console.log('childeServices.value.length: ', childeServices.value.length)
if (!childeServices.value.length) {
  const { pending, data: notion, refresh, error } = await fetch()

  if (error.value)
    errorHandler(error.value)

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

      setLinks(notion.value)

      // When query string changes, refresh
      childeServices.value = notion.value.childeServices
    }
    catch (error) {
      console.error('ERROR MESSAGE: ', error.message)
    }
  }, { deep: true })

  isPending.value = pending.value

  isServices = !!notion.value.childeServices.length

  fpCover.value = notion.value.cover
  console.log('url: ', url)

  setLinks(notion.value)

  childeServices.value = notion.value.childeServices
  // console.log('links.value: ', links.value)
  isLinks = useObjcectLength(links.value)
}

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
      <!-- HEADER -->
      <template #logo>
        <r-logo :width="245" class="md:mt-0">
          <template #img>
            <img class="cursor-pointer bg-contain" src="/U-Service-full.png">
          </template>
        </r-logo>
      </template>

      <template #header-right>
        <r-top-navigation v-if="!$device.isMobile && isLinks" :routes="rightNavigation" :padding-r="32"
          class="text-light-100" />
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
      <!-- <template #footer>
              {{ route.fullPath }}
            </template> -->
    <!-- END FOOTER -->
  </NuxtLayout>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
