<script setup>
/* eslint-disable no-console */
const route = useRoute()

const links = useNavigationLinks()

const services = links.value.find(({ path }) => path.includes(route?.params?.model[0]))?.services
console.log('services: ', services)

const childeServices = useServices()

const metaLinks = ref([])

definePageMeta({
  keepalive: true,
})

const generatedKey = str => useGeneratedKey(str)
const ids = services.map(({ id }) => id)
const queryString = ids.join('&services=')

const { data, error } = await useFetch(`/api/services?services=${queryString}`)
const createBgColor = (suffix) => {
  return typeof suffix === 'number' ? `bg-blue-${(suffix + 1) * 100}` : `bg-[url('${suffix}')]`
}
data?.value?.forEach((s, i) => {
  const itemClass = createBgColor(s.imgUrl || i)
  childeServices.value.push({ ...s, itemClass })
})

if (error) console.error(error)
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
        <div v-for="({ name, imgUrl='', itemClass }, i) in childeServices" :key="generatedKey(name)"
          :id="`content-${i}`" :style="`
          background-image: url('${imgUrl}');
          background-position: center;
          background-size: cover;`"
          :class="['snap-start h-screen w-screen', itemClass, 'flex text-center items-center justify-center']">
          <!-- <span :class="`flex h-screen pt-[calc(13vh+20px)] mx-auto p-4`">
            {{ name || `some name ${i}` }}
          </span> -->
          <div class="mx-4 bg-white opacity-70 backdrop-blur-sm">
            <h1
              :class="['font-bold tracking-wider text-[10.25rem] leading-[1.15] py-1 capitalize mw-auto px-1']">
              {{ name || `some name ${i}` }}}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
