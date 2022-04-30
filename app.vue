<script setup>
/* eslint-disable no-console */
definePageMeta({
  layout: false,
  keepalive: true,
})

const route = useRoute()
const name = route?.params?.model ? route?.params?.model[0] : ''

const sidebar = useSidebar()

const onClick = () => {
  sidebar.value = !sidebar.value
  useSidebarToggle()
}

const pending = usePending()

// const { data } = await useAsyncData('/api/notion', () => $fetch('/api/notion'), { watch: [links] })

const links = useNavigationLinks()
const fpCover = useFpCover()

if (!links.value.length) {
  const { pending: isPending, data } = await useLazyAsyncData('links', () => $fetch('/api/notion', {
    body: {
      fp: true,
    },
  }))

  pending.value = isPending
  // const { data } = await useFetch('/api/notion')

  if (data && data.value) {
    fpCover.value = data.value.cover
    links.value = data.value.links.map((link) => {
      const name = link.name.split(' ')
      return {
        ...link,
        splitedName: name,
      }
    }) || []
  }
}

const linkRels = ref([])
const linkRelPush = (imgUrl, path) => {
  linkRels.value.push({ imgUrl, path })
}

if (links.value.length) {
  links.value.forEach((link) => {
    linkRelPush(link.imgUrl, link.path)
    link.services.forEach(({ imgUrl = '', path = '' }) => {
      if (imgUrl)
        linkRelPush(imgUrl, path)
    })
  })
}

const generateImageLink = (path, ext) => `${path}.${ext}`

const rightNavigation = [
  {
    path: '/about',
    name: 'Մեր մասին',
  },
  {
    path: '/model/2',
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
  <NuxtLayout :name="$device.isDesktop ? 'default' : 'mobile'">
    <Html lang="en-US">

    <Head>
      <Meta name="description" :content="`My page's ${name} description`" />
    </Head>
    <Link v-if="!!linkRels.length" v-for="({ imgUrl, path }) in linkRels" :key="generatedKey(`${path}-avif`)" rel="preload"
      :href="imgUrl" as="image" />

    <!-- generateImageLink(imgUrl, 'avif') -->

    </Html>
    <!-- HEADER -->
    <template #logo>
      <r-logo :width="245" class="md:mt-0"></r-logo>
    </template>

    <!-- <template #nav v-if="name">
      <r-top-navigation v-show="$device.isDesktop" routes-prefix="/model" :routes="links" :center="true">
      </r-top-navigation>
    </template> -->

    <template #header-right>
      <r-top-navigation v-if="$device.isDesktop && links?.length" :routes="rightNavigation" :padding-r="32">
      </r-top-navigation>
      <!-- MOBILE BUTTON -->
      <div v-if="$device.isMobile" class="flex items-center text min-h-13.5 min-w-19.9775 w-19.9775 pr-5 pb-2">
        <r-link-button @click="onClick">Ցանկ</r-link-button>
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
