/* eslint-disable no-console */

import { TypeReferenceType } from "typescript"

/* eslint-disable semi */
export function useScrollIntoParentNextSiblingElement(selector: any): void {
  try {
    const element: Element = document.querySelector(selector)

    if (!element)
      throw new ReferenceError(`element with selector '${selector}' not found`)

    console.log('element: ', element)
    element.scrollIntoView({
      behavior: 'smooth',
    })
  }
  catch (err: any) {
    useErrorHandler(err)
  }
}
