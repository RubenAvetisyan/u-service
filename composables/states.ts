/* eslint-disable no-console */
/* eslint-disable no-undef */
import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'

export const useStore = defineStore('storeId', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      hidden: false,
    }
  },
  actions: {
    sidebarToggle() {
      this.hidden = !this.hidden
    },
  },

  getters: {
    isHidden: state => state.hidden,
  },
})

export const useNavigationLinks = () => {
  return useState<any>('links', () => ({}))
}

export const useServices = () => {
  return useState('services', () => ({}))
}

export const useFpCover = () => {
  return useState('fpCover', () => (''))
}

export const usePending = () => {
  return useState('pending', () => (false))
}

export const useLoading = () => {
  return useState('loading', () => false)
}

export const useBackgroundImg = () => {
  return useState('backgroundImg', () => '')
}

export const useCurrentService = () => {
  const link: { name?: string } | any = useFindLink()
  return useState('currentService', () => link)
}

export const useTitle = () => {
  const link = useCurrentService()
  return useState('title', () => link.value?.name || '')
}

export const useServiceIds = () => {
  return useState('serviceIds', () => '')
}

export const useCurrentServiceId = () => {
  return useState('currentServiceId', () => '')
}

export const useLinkMeta = () => {
  const route = useRoute()
  const backgroundImg = useBackgroundImg()
  const linkRels = [{ imgUrl: backgroundImg.value, path: route?.params?.model || route.path }]
  const { links } = storeToRefs(useNotionStore())

  const linksValues = Object.values(links.value) as any[]

  if (linksValues.length) {
    linksValues.forEach(({ imgUrl: linkImgUrl = '', path: linkPath = '', services = {} }) => {
      linkRels.push({ imgUrl: linkImgUrl, path: linkPath });
      (Object.values(services) as any[]).forEach(({ imgUrl = '', path = '' }) => {
        if (imgUrl)
          linkRels.push({ imgUrl, path })
      })
    })
  }
  return useState('linkMeta', () => linkRels.map(({ imgUrl = '' }, i) => ({
    key: `page-backgound-avif-${i}`,
    rel: 'preload',
    href: imgUrl,
    as: 'image',
  })).filter(({ href }) => href))
}

export const useChildeServices = () => {
  return useState('childeServices', () => ([]))
}

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
