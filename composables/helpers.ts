/* eslint-disable no-console */
/* eslint-disable no-undef */
type Img = string

interface Mylink {
  imgUrl?: Img
}

export const useMyBackgoundImg = (img: Img = ''): void => {
  const route = useRoute()
  const fpCover = useFpCover()
  const backgroundImg = useBackgroundImg()
  const myLink: Mylink = useFindLink()

  backgroundImg.value = route.params?.model ? img || myLink?.imgUrl : fpCover.value
}
