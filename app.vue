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

const name = model?.length ? model[0] : ''

const sidebar = useSidebar()

const onClick = () => {
  sidebar.value = !sidebar.value
  useTimeoutFn(() => useSidebarToggle(), 250)
}

const links = useNavigationLinks()

const link = ref({})

const isLinks = !!links.value.length

let isServices = false

if (!isLinks) {
  const { pending, data: notion } = await useAsyncData(
    'notion',
    () => notionFetch('/notion?fp=true', { lazy: true }),
  )

  // When query string changes, refresh
  watch(() => pending, async(a, b) => {
    console.log('a, b: ', a, b)
  })

  isPending.value = pending.value

  isServices = !!notion.value.childeServices.length

  fpCover.value = notion.value.cover
  links.value = notion.value.links.map((link) => {
    const splitedName = link.name.split(' ')
    return {
      ...link,
      splitedName,
    }
  }) || []
}

isServices = !!link.value.services?.length && link.value.services?.every(({ name = null }) => name) && !!model.length

if (!isServices) {
  const { pending, data: services } = await useLazyAsyncData(
    'services',
    () => notionFetch('/services?db_id=d4af2b073c0e4d9ea64f85b72a23db0c'),
  )

  // When query string changes, refresh
  watch(() => services.value, async(a, b) => {
    refresh()
  })

  isPending.value = pending
  const createBgColor = (suffix) => {
    return typeof suffix === 'number' ? `bg-blue-${(suffix + 1) * 100}` : `bg-[url('${suffix}')]`
  }

  links.value.forEach((link) => {
    services.value?.forEach((s, i) => {
      const serviceIndex = link.services.findIndex(({ id }) => s.id === id)
      const itemClass = createBgColor(s.imgUrl || i)

      if (serviceIndex !== -1)
        link.services[serviceIndex] = { ...s, itemClass }
    })
  })
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
const generatedKey = str => useGeneratedKey(str)
</script>

<template>
  <NuxtLayout :name="$device.isDesktopOrTablet ? 'default' : 'mobile'">
    <Html lang="hy">

    <Head>
      <Meta name="description" :content="`My page's ${name} description`" />
    </Head>
    <!-- <Link v-if="!!linkRels.length" v-for="({ imgUrl, path }) in linkRels" :key="generatedKey(`${path}-avif`)"
      rel="preload" :href="imgUrl" as="image" /> -->

    </Html>
    <!-- HEADER -->
    <template #logo>
      <r-logo :width="245" class="md:mt-0">

        <template #img>
          <img class="cursor-pointer bg-contain" src="/U-Service-full.png" />
        </template>

      </r-logo>
    </template>

    <!-- <template #nav v-if="name">
      <r-top-navigation v-show="$device.isDesktop" routes-prefix="model" :routes="links" :center="true">
      </r-top-navigation>
    </template> -->

    <template #header-right>
      <r-top-navigation v-show="$device.isDesktop && links?.length" :routes="rightNavigation" :padding-r="32"
        class="text-light-100">
      </r-top-navigation>
      <!-- MOBILE BUTTON -->
      <div v-if="$device.isMobile" class="flex items-center text min-h-13.5 min-w-19.9775 w-19.9775 pr-5 pb-2">
        <r-link-button @click="onClick" class="text-light-100 bg-dark-50">Ցանկ</r-link-button>
      </div>
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
