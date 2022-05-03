/* eslint-disable no-undef */
export const useSidebar = () => {
  return useState('show', (isHidden = false) => isHidden)
}

export const useNavigationLinks = () => {
  return useState<[]>('links', () => ([]))
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
