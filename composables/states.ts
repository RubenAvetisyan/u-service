/* eslint-disable no-undef */
export const useSidebar = () => {
  return useState('show', (isHidden = false) => isHidden)
}

export const useNavigationLinks = () => {
  return useState<[]>('links', () => ([]))
}

export const useFpCover = () => {
  return useState('fpCover', () => (''))
}
