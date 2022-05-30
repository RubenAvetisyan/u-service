/* eslint-disable no-console */
import { acceptHMRUpdate, defineStore } from 'pinia'
import { NotionValue } from './helpers'

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
  childeServices: {}
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
      if (!useObjcectLength(this.notionValue.links) && nvl)
        this.notionValue.links = nvl.links
      this.splitName(nvl.links)
    },
    splitName(links: Record<string, any>) {
      Object.entries(links).forEach(([_, link]) => {
        const splitedName = link.name.split(' ')
        link.splitedName = splitedName
      })
      this.services = { ...links }
      return this.services
    },
    setChildeServices(childeServiceIds: string[], path: string) {
      if(!path) return
      const childeServices = ref(new Set<string>())
      childeServiceIds.forEach(serviceId => childeServices.value.add(serviceId))
      this.childeServices = {
        [path.replace(/\//g, '')]: [...childeServices.value]
      }
    },
    setQuery(key?: string) {
      const queryKey = key ? `?${key}=` : '?db_id='
      return `${queryKey}${[...Object.values(this.childeServices)].join(queryKey)}`
    },
    addServices(nvl: NotionValue) {
      try {

        if (!nvl)
          return

        const vals = Object.entries(nvl) as [key: string, value: any][]
        vals.forEach(([key, value]) => {
          setLink(key, value, this.services)
          setServiceByPath(value.path, value, this.servicesByPath)
        })

        return this.services
      }
      catch (error: any) {
        if (!error?.value) {
          console.error('error: ', error)
          return
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
      console.log('path: ', path);
      if (!path || !this)
        return {}
      const result: Obj = {}
      const services: [key: string, value: Obj][] = Object.entries(this.links)

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
        console.log('getServiceByPath path: ', path);

        if (!state.servicesByPath[path]) {
          console.log(`Service by key: ${path} not found`)
          return undefined
        }
        return this.servicesByPath[path]
      }
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

function setServiceByPath(path: string, service: Obj, links: Obj): void {
  if (!service || !links)
    return

  links[path.replace(/\//g, '')] = service

  Object.entries(links[path]?.services || {}).forEach((s: any) => {
    setServiceByPath(s.path, s?.services, links[path]?.services)
  })
}
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useNotionStore, import.meta.hot))
