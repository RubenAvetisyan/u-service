/* eslint-disable no-console */
import { H3Error, createError } from 'h3'
import { storeToRefs } from 'pinia'
import { useServiceIds } from './states'

/* eslint-disable no-undef */
type Img = string

interface Mylink {
  imgUrl?: Img
}

export const useMyBackgroundImg = (img: Img = ''): void => {
  const fpCover = useFpCover()
  const backgroundImg = useBackgroundImg()

  const path = useGetLastParam('model')
  const notionStore = useNotionStore()
  const myLink: Mylink = path ? notionStore.getServiceByPath(path) : undefined

  backgroundImg.value = path ? img || myLink?.imgUrl || '' : fpCover.value
}
export const useCreateBgColor = (suffix: number): string => {
  return typeof suffix === 'number' ? `bg-blue-${(suffix + 1) * 100}` : `bg-[url('${suffix}')]`
}

export interface NotionValue {
  links: {
    name: string
    splitedName?: string[]
  }[]
}

export const useNotionLinks = (notionValue: NotionValue) => {
  const isLinks = !!useObjcectLength(notionValue?.links)

  if (isLinks) {
    Object.entries(notionValue.links).forEach(([_, link]) => {
      const splitedName = link.name.split(' ')
      link.splitedName = splitedName
    })
  }

  UseSetNavigationLinks(notionValue.links)
}

// interface Services {
//   id: string
//   imgUrl: string
// }

type Obj = Record<string, any>
export const useServicesCall = (servicesValue: Obj, links: Obj) => {
  try {

    if (!servicesValue || !links)
      return


    const vals = Object.entries(servicesValue) as [key: string, value: any][]
    vals.forEach(([key, value]) => {
      // links.value[value.parentServiceId].services[key] = servicesValue[key]
      if (links[value.parentServiceId])
        findLink(key, value, links)
    })

    return links

    // 
  }
  catch (error: any) {
    if (!error?.value) {

      return
    }

    throwError(new Error(error.value))
  }
}

export function useAddDownloadedLink(linkId: string): void {
  const serviceIds = useServiceIds()
  serviceIds.value = `${serviceIds.value}${linkId}`
}

export function UseSetNavigationLinks(_value: any): void {
  const links = useNavigationLinks()
  links.value = _value
}

export function useObjcectLength(_object: {}): number {
  return Reflect.ownKeys(_object).length
}

function findLink(match: string, service: Obj, links: Obj): void {
  if (!links[service.parentServiceId]?.services[match])
    findLink(match, service, links.services)
  else
    links[service.parentServiceId].services[match] = service
}

interface ErrorHandler {
  value?: string,
  message?: string
}

export const useErrorHandler = (error: ErrorHandler | string) => {
  const errorProp = typeof error === 'object' ? error?.value || error?.message : error
  const isError = !!errorProp
  const isErrorTypeSring = typeof error === 'string' || error?.value !== 'string' && typeof error?.message !== 'string'

  if (!isError || !isErrorTypeSring) {
    return isError
      ? throwError(`Expected error value to be truethy, but got ${errorProp}`)
      : throwError(`Expected error to be a typeof "string", but got ${isErrorTypeSring}`)
  }

  if (process.client && isError && isErrorTypeSring) {
    throwError(errorProp)
    clearError()
  }
  else {
    console.error('ERROR MESSAGE while ftching data: ', errorProp)
  }
}

export const useSetLinks = async (notionValue: any, url: string) => {
  return Promise.resolve(setLinks(notionValue, url))
}

function setLinks(notionValue: any, url: string) {
  const notionStore = useNotionStore()
  const { links } = storeToRefs(notionStore)

  if (url.includes('notion')) {
    notionStore.setMainServices(notionValue)
  }
  else {
    // links.value =
    notionStore.addServices(notionValue?.links)

  }

  return links
}
// :style="`background-image: url('${backgroundImg}');`"

export const useParamErrorHandler = (param: string, cb?: Function) => {
  const paramNotFound = new H3Error()
  paramNotFound.statusCode = 501
  const mainMsg = `${param} not found on this route.`
  paramNotFound.message = cb ? cb(mainMsg) : mainMsg
  throw createError(paramNotFound)
}

export const useGetParams = (param: string): string | string[] => {
  const route = useRoute()
  const value = route.params[param]

  if (value === null) {
    useParamErrorHandler(param, (msg: string) => `${msg} The params for this route are ${JSON.stringify(route.params)}`)
  }

  return value
}

export const useGetFirstParam = (paramKey = ''): string => {
  const model = useGetParams(paramKey)
  return model && typeof model !== 'string' ? model[0] : model || ''
}

export const useGetLastParam = (paramKey = ''): string => {
  const model = useGetParams(paramKey)
  return model && typeof model !== 'string' ? model[model.length-1] : model || ''
}

function find(_object: Obj, match: string) {
  return Object.values(_object).find(({ path = '' }) => {
    return path.includes(match)
  }) || {}
}
