/* eslint-disable no-console */
// interface Serverside{
//   process: {
//     server: Boolean
//   }
// }

export const useCachecontrole = (values: object) => ({ res }): void => {
  if (!process.server) return
  console.log('process.server ddd: ', process.server)

  console.log('values: ', values)
  const cacheControlValue: string = Object.entries(values)
    .map(([key, value]) => `${key}=${value}`)
    .join(',')

  res.setHeader('Cache-Control', cacheControlValue)
}
