/* eslint-disable no-undef */
/* eslint-disable no-console */

type Findlinks = string

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useFindLink = (to?: Findlinks) => {
  const links = useNavigationLinks()
  const route = useRoute()
  const match = route?.params?.model?.length ? route?.params?.model[0] : ''
  if (!match)console.log('links: ', links.value)

  const res: {} = match
    ? links.value.find(({ path = '' }): Boolean => {
      return path.includes(match)
    })
    : null

  return res
}
