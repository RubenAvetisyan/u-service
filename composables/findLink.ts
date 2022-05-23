/* eslint-disable no-undef */
/* eslint-disable no-console */
import { storeToRefs } from 'pinia'

type Obj = Record<string, any>

export const useFindLink = (serveces?: Obj, path = '') => {
  const links = serveces || storeToRefs(useNotionStore()).links.value
  const route = !path ? useRoute() : null
  const match = route?.params?.model?.length && !path ? route.params.model[0] : path

  let res: {} = find(links, match)

  if (!Reflect.ownKeys(res).length && links?.services)
    res = useFindLink(links.services, match)

  return res
}

function find(_object: Obj, match: string) {
  return Object.values(_object).find(({ path = '' }) => {
    return path.includes(match)
  }) || {}
}
