type ArrayOfObjects = {}[]
export type FilterByObjectKey = string[] | [string, any][] | ArrayOfObjects

type CallBack = Function | undefined
export const filterByObjectKey = (object: Record<string, any>, keyValue: string, cb: CallBack = ()=>{}): FilterByObjectKey => {
  const result = Object.entries(object).filter(([key]) => key.includes(keyValue))
  return cb(result) || result
}
