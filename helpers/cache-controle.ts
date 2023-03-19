/* eslint-disable no-console */
// interface Serverside{
//   process: {
//     server: Boolean
//   }
// }

export const useCachecontrole = (values = {}) => ({ res }: {
  res: any
}): void => {
  if (!process.server || !useObjcectLength(values))
    return

  const cacheControlValue: string = Object.entries(values)
    .map(([key, value]) => `${key}=${value}`)
    .join(',')

  res.setHeader('Cache-Control', cacheControlValue)
}
