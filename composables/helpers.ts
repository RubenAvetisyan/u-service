/* eslint-disable no-console */
import { useServiceIds } from './states'

/* eslint-disable no-undef */
type Img = string

interface Mylink {
  imgUrl?: Img
}

export const useMyBackgroundImg = (img: Img = ''): void => {
  const route = useRoute()
  const fpCover = useFpCover()
  const backgroundImg = useBackgroundImg()
  const myLink: Mylink = useFindLink()

  backgroundImg.value = route.params?.model?.length ? img || myLink?.imgUrl || '' : fpCover.value
}
export const useCreateBgColor = (suffix: number): string => {
  return typeof suffix === 'number' ? `bg-blue-${(suffix + 1) * 100}` : `bg-[url('${suffix}')]`
}

interface NotionValue {
  links: {
    name: string
    splitedName?: string[]
  }[]
}

export const useNotionLinks = (notionValue: NotionValue) => {
  console.log('==== useNotionLinks ====')
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
    console.log('==== Services useLazyAsyncData ====')
    if (!servicesValue || !links)
      return
    console.log('servicesValue: ', servicesValue)

    const vals = Object.entries(servicesValue) as [key: string, value: any][]
    vals.forEach(([key, value]) => {
      // links.value[value.parentServiceId].services[key] = servicesValue[key]
      if (links[value.parentServiceId])
        findLink(key, value, links)
    })

    return links

    // console.log('links: ', links.value)
  }
  catch (error: any) {
    if (!error?.value) {
      console.log('error: ', error)
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
  console.log('Reflect.ownKeys(_object).length: ', !!Reflect.ownKeys(_object).length)
  return Reflect.ownKeys(_object).length
}

function findLink(match: string, service: Obj, links: Obj): void {
  if (!links[service.parentServiceId]?.services[match])
    findLink(match, service, links.services)
  else
    links[service.parentServiceId].services[match] = service
}
