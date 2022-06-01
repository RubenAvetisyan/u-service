import { createError, H3Error } from 'h3';

type ArrayOfObjects = {}[]
export type FilterByObjectKey = string[] | [string, any][] | ArrayOfObjects

type CallBack = Function | undefined
export const filterByObjectKey = (object: Record<string, any>, keyValue: string, cb: CallBack = () => {}): FilterByObjectKey => {
  const result = Object.entries(object).filter(([key]) => key.includes(keyValue))
  return cb(result) || result
}

export const errorHandler = (statusCode: number, errorMessage: string, cb?: Function) => {
  const h3Error = new H3Error()
  h3Error.statusCode = 501
  const mainMsg = statusCode
  h3Error.message = cb ? cb(errorMessage) : errorMessage
  throw createError(h3Error)
}
