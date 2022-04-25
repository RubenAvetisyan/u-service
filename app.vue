<script setup>
/* eslint-disable no-console */
definePageMeta({
  layout: false,
})

const route = useRoute()
const name = route?.params?.model ? route?.params?.model[0] : ''

const sidebar = useSidebar()

const onClick = () => {
  sidebar.value = !sidebar.value
  useSidebarToggle()
}

// const { data } = await useAsyncData('/api/notion', () => $fetch('/api/notion'), { watch: [links] })

const links = useNavigationLinks()

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
    name: 'Ծառայությունների ցուցակ',
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
    <Link v-for="({ imgUrl, name }) in links" :key="generatedKey(`${name}-${imgUrl}-avif`)" rel="preload" :href="imgUrl"
      as="image" />

    <!-- generateImageLink(imgUrl, 'avif') -->

    </Html>
    <!-- HEADER -->
    <template #logo>
      <r-logo :width="245" class="md:mt-0"></r-logo>
    </template>

    <template #nav v-if="name">
      <r-top-navigation v-show="$device.isDesktop" routes-prefix="/model" :routes="links" :center="true">
      </r-top-navigation>
    </template>

    <template #header-right>
      <r-top-navigation v-if="$device.isDesktop" :routes="rightNavigation" :padding-r="32">
      </r-top-navigation>
      <!-- MOBILE BUTTON -->
      <div v-if="$device.isMobile" class="flex items-center text min-h-13.5 min-w-19.9775 w-19.9775 pr-5 pb-2">
        <r-link-button @click="onClick">menu</r-link-button>
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
