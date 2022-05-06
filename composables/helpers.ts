/* eslint-disable no-console */
/* eslint-disable no-undef */
type Img = string

interface Mylink {
  imgUrl?: Img
}

export const useMyBackgoundImg = (img: Img = ''): void => {
  const fpCover = useFpCover()
  const backgroundImg = useBackgroundImg()
  const myLink: Mylink = useFindLink()

  backgroundImg.value = img || myLink?.imgUrl || fpCover.value || `background-image: url('${img || myLink?.imgUrl || fpCover.value}');`
}

export const useLinkRelPush = (linkRels, imgUrl, path) => {
  linkRels.push({ imgUrl, path })
}
