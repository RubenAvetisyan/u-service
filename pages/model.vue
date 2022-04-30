<script setup>
/* eslint-disable no-console */
const route = useRoute()

const links = useNavigationLinks()

const services = links.value.find(({ path }) => path.includes(route?.params?.model[0]))?.services

const generatedKey = str => useGeneratedKey(str)
const notGenerated = services.every(({ name = null }) => !name)
console.log('notGenerated: ', notGenerated)

if (notGenerated) {
  const ids = services.map(({ id }) => id)
  const queryString = ids.join('&services=')

  const { data, error = null } = await useFetch(`/api/services?services=${queryString}`)
  const createBgColor = (suffix) => {
    return typeof suffix === 'number' ? `bg-blue-${(suffix + 1) * 100}` : `bg-[url('${suffix}')]`
  }
  data?.value?.forEach((s, i) => {
    const itemClass = createBgColor(s.imgUrl || i)
    links.value.forEach(({ path, services }) => {
      if (path.includes(route?.params?.model[0])) {
        services.forEach(({ id }, i) => {
          if (id === s.id)
            services[i] = { ...s, itemClass }
        })
      }
    })
  })
}

console.log('services: ', services)

// if (error) console.error(error)
// onMounted(async() => {
//   try {
//   }
//   catch (error) {
//     console.error('error: ', error)
//   }
// })

const scrollDown = selector => useScrollIntoParentNextSiblingElement(selector)

</script>

<template>
  <div class="h-screen justify-between pb-13.75 flex flex-col items-center">
    <div class="snap-start h-screen pt-[calc(13vh+20px)]">
      <div class="text-center">
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

      <div id="contents">
        <div v-for="({ name, imgUrl='', itemClass = '', path = '/' }, i) in services" :key="generatedKey(name)"
          :id="`content-${i}`" :style="`
          background-image: url('${imgUrl}');
          background-position: center;
          background-size: cover;`"
          :class="['snap-start h-screen w-screen', itemClass, 'flex text-center items-center justify-center']">
          <!-- <span :class="`flex h-screen pt-[calc(13vh+20px)] mx-auto p-4`">
            {{ name || `some name ${i}` }}
          </span> -->
          <div class="mx-4">
            <r-home-menu :key="`service-block-${path.replace(/\//g, '')}`" routes-prefix="/model" :path="path"
              color="red-600" class="flex mx-auto h-20 ma-2 pa-4 rounded-xl align-center justify-center">
              <h1 :class="['font-bold tracking-wider text-[10.25rem] leading-[1.15] py-1 capitalize mw-auto px-1']">
                {{ name || `some name ${i}` }}</h1>
            </r-home-menu>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
