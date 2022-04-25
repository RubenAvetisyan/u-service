/* eslint-disable no-console */
/* eslint-disable semi */
export function useScrollIntoParentNextSiblingElement(selector): void {
  try {
    const element: Element = document.querySelector(selector)

    if (!element)
      throw new ReferenceError(`element with selector '${selector}' not found`)

    console.log('element: ', element)
    element.scrollIntoView({
      behavior: 'smooth',
    })
  }
  catch (err) {
    console.error('error: ', err)
  }
}
