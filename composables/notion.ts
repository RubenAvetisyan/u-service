/* eslint-disable no-console */
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { NotionValue } from './helpers'

type Obj = Record<string, any>
export const notionFetch = (url: string, fetchOptions: any = {}) => {
  // eslint-disable-next-line no-undef

  return $fetch(url, {
    baseURL: '/api',
    ...fetchOptions,
    // headers: {
    //   Authorization: `token ${useGithubCookie().value}`,
    //   ...fetchOptions.headers,
    // },
  })
}

interface StateReturn {
  notionValue: Record<string, any>
  childeServices: { [key: string]: string[] }
  services: Obj
  servicesByPath: Obj
}

export const useNotionStore = defineStore('notion', {
  state: (): StateReturn => {
    return {
      // all these properties will have their type inferred automatically
      notionValue: { links: {} },
      childeServices: {},
      services: {},
      servicesByPath: {},
    }
  },
  actions: {
    setMainServices(nvl: NotionValue) {
      if (!useObjcectLength(this.notionValue.links) && nvl) {
        this.notionValue.links = nvl.links
      }

      this.splitName(nvl.links)
    },
    splitName(links: Record<string, any>) {
      Object.entries(links).forEach(([_, link]) => {
        const splitedName = link.name.split(' ')
        link.splitedName = splitedName
      })
      this.services = { ...links }
      Object.entries(links).forEach(([key, service]) => {
        setServiceByPath(key, service.path, service, this.servicesByPath)
      })
      return this.services
    },
    setChildeServices(childeServiceIds: string[] = [], links: { [key: string]: any }) {


      if (!childeServiceIds?.length) return useErrorHandler(`expected prop: childeServiceIds to be typeof string[],but
got type: ${typeof childeServiceIds} and value: ${childeServiceIds}`)

      if (!links)
        return

      let key = Object.values(links).map(({ path = '' }) => path).join('')
      key = key.split('/').filter(s => s).join('/')

      const childeServices = ref(new Set<string>([...Object.values(this.childeServices[key] || {}).flat()]))
      childeServiceIds.forEach(serviceId => childeServices.value.add(serviceId))
      this.childeServices = { [key]: [...childeServices.value] }
    },
    setQuery(key?: string) {
      const name = useGetLastParam('model') || ''
      const queryKey = key ? `?${key}=` : '?db_id='
      const path = useGetLastParam('model') || ''
      const childeServices = Object.entries(this.childeServices).find(([key]) => key.includes(path))

      if (!childeServices?.length) return ''
      return `${queryKey}${childeServices[1].join(queryKey)}`
    },
    addServices(nvl: NotionValue) {

      try {
        if (!nvl)
          return

        const vals = Object.entries(nvl) as [key: string, value: any][]
        vals.forEach(([key, value]) => {
          // setLink(key, value, this.services)
          setServiceByPath(key, value.path, value, this.servicesByPath)
        })

        return this.services
      }
      catch (error: any) {
        if (!error?.value) {
          return useErrorHandler(error)
        }
        throwError(new Error(error.value))
      }
    },
  },
  getters: {
    links(state) {
      return state.services
    },
    getChildeServices: state => state.childeServices,
    currentLink(state) {
      const path = useGetFirstParam('model')

      if (!path || !this)
        return {}
      const result: Obj = {}
      const services: [key: string, value: Obj][] = Object.entries(state.services)

      // const hasValues = (obj: Obj) => useObjcectLength(obj)
      const find = (toFindServices: [key: string, value: Obj][]) => toFindServices.find(([_, value]) => value.path.includes(path))
      const inMain = find(services)
      if (inMain?.length)
        return result[inMain[0]] = inMain[1]
      const setResult: any = (toFindServices: [key: string, value: Obj][]) => {
        const inServices = find(toFindServices)
        if (inServices?.length)
          result[inServices[0]] = inServices[1]
        else
          toFindServices.forEach(s => setResult(Object.entries(s)))
      }
      setResult(services)

      return result || {}
    },
    getServiceByPath(state) {
      return (path: string) => {


        if (!state.servicesByPath[path]) {

          return undefined
        }

        return this.servicesByPath[path]
      }
    },
    getTitle() {
      this.getServiceByPath.name
    }
  },
})

function setLink(match: string, service: Obj, links: Obj): void {
  if (!service || !links)
    return
  if (!links[service?.parentServiceId]?.services[match])
    setLink(match, service?.services, links?.services)
  else
    links[service.parentServiceId].services[match] = service
}

function setServiceByPath(serviceKey: string, path: string, service: Obj, links: Obj): void {
  if (!service || !links)
    return

  const key = path.replace(/\//g, '')

  if (!links[key]) links[key] = service

  let childServicePath = ''

  Object.values(links).forEach(link => {
    if (link.childPaths.includes(path)) {
      link.services[serviceKey] = service
      childServicePath
    }
  })

  // links[key]


  // interface Obj {
  //   [key: string]: any
  // }

  // Object.entries(links[path]?.services || {}).forEach(([key, value]: [string, any]) => {
  //   // if(links[path]?.services) links[path].services[key] = value
  //   setServiceByPath(value.path, value?.services, links[path]?.services)
  // })
}
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useNotionStore, import.meta.hot))
