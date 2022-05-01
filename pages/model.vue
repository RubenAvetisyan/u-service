<script setup>
/* eslint-disable no-console */
const route = useRoute()

const links = useNavigationLinks()

const generatedKey = str => useGeneratedKey(str)
const services = ref([])

const link = ref({})
const linkIndex = links.value.findIndex(({ path = '' }) => path.includes(route?.params?.model[0]))
link.value = links.value[linkIndex]

const notGenerated = link.value.services.length && link.value.services.every(({ name = null }) => !name)
console.log('notGenerated: ', notGenerated)

if (notGenerated) {
  const ids = link.value.services.map(({ id }) => id)
  const queryString = ids.join('&services=')

  const { data: newLinkServices, pending, refresh, error } = await useAsyncData(
    'newLinkServices',
    () => notionFetch(`/services?services=${queryString}`),
  )

  if (error.value)
    throwError(error.value)

  // When query string changes, refresh
  watch(() => queryString, async(a, b) => {
    console.log('a, b: ', a, b)
    refresh()
  })

  console.log('newLinkServices: ', newLinkServices)
  const createBgColor = (suffix) => {
    return typeof suffix === 'number' ? `bg-blue-${(suffix + 1) * 100}` : `bg-[url('${suffix}')]`
  }

  newLinkServices?.value?.forEach((s, i) => {
    const itemClass = createBgColor(s.imgUrl || i)
    const serviceIndex = link.value.services.findIndex(service => service.id === s.id)

    if (serviceIndex !== -1) {
      links.value[linkIndex].services[serviceIndex] = { ...s, itemClass }
      console.log('service: ', links.value[linkIndex].services[serviceIndex])
    }
  })

  // const { pending, data: linkServices, error = null } = await useLazyFetch(`/api/services?services=${queryString}`)

  console.log('link.services: ', link.value.services)
}

const bgImg = imgUrl => `bg-[url('${imgUrl}')`

const scrollDown = selector => useScrollIntoParentNextSiblingElement(selector)

</script>

<template>
  <div class="h-screen justify-between pb-13.75 flex flex-col items-center">
    <div class="snap-start h-screen pt-[calc(13vh+20px)]">
      <div v-if="links.length" class="text-center">
        <NuxtPage class="w-full mx-auto justify-center items-center" />

        <h2 class="font-light tracking-wider text-[#5c5d61] text-3.5 pb-2">
          Պատվիրել Online՝
          <content-anim-link>Անհպում մատակարարում</content-anim-link>
        </h2>
      </div>
      <div
        class="flex flex-col md:flex-row place-items-center text-center items-center justify-center md:space-x-6.25 space-y-5.5 md:space-y-0 mt-4">
        <content-btn dark>ԱՆՀԱՏԱԿԱՆ ՊԱՏՎԵՐ</content-btn>
        <content-btn>Առկա ծառայություններ</content-btn>
      </div>
      <content-chevron-down @click="() => scrollDown('#contents')" class="mt-[50vh] md:mt-[65vh] mb-[6vh]">
      </content-chevron-down>

      <div v-if="link.services?.length" id="contents">
        <div v-for="({ name='', imgUrl='', itemClass = '', path = '/' }, i) in link.services"
          :key="generatedKey(name + '-' + i)" :id="`content-${i}`" :style="`
          background-image: url('${imgUrl}');
          background-position: center;
          background-size: cover;`"
          :class="[bgImg, 'snap-start h-screen w-screen relative', itemClass, 'flex text-center items-center justify-center']">
          <div class="flex mx-4 items-center justify-center h-10 text-center content-center">
            <r-home-menu :key="`service-block-${path.replace(/\//g, '')}`" routes-prefix="/model" :path="path"
              class="flex mx-auto text-dark-50 hover:text-light-100 h-20 w-80 ma-2 rounded-xl align-center justify-center">
              <span
                :class="['bg-clip-text font-bold text-stroke-blue-gray-500  font-bold tracking-wider text-[10.25rem] leading-[1.15] py-1 capitalize mw-auto px-1']">
                {{ name || `some name ${i}` }}</span>
            </r-home-menu>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
