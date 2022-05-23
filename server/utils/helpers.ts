type ArrayOfObjects = {}[]
export type FilterByObjectKey = string[] | [string, any][] | ArrayOfObjects

type CallBack = Function | undefined
export const filterByObjectKey = (object: {}, keyValue: string, cb: CallBack = undefined): FilterByObjectKey => {
  const result = Object.entries(object).filter(([key]) => key.includes(keyValue))
  return !cb ? result : cb(result)
}
