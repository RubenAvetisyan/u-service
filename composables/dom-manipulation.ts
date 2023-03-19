/* eslint-disable no-console */

// import { TypeReferenceType } from 'typescript'

/* eslint-disable semi */
const scrollIntoParentNextSiblingElement = (selector: any): void => {
  try {
    const element: Element = document.querySelector(selector)

    if (!element) {
      throw new ReferenceError(`element with selector '${selector}' not found`)
    }
    else {
      element.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }
  catch (err: any) {
    useErrorHandler(err)
  }
}

export function useChevronScrollDown() {
  const fn = (selector: string) => (): void => scrollIntoParentNextSiblingElement(selector)
  return fn
}
