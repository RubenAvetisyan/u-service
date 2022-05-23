/* eslint-disable no-console */
import { appendHeader } from 'h3'

const cacheControl = (values: {}) => {
  const cacheControlValue = Object.entries(values)
    .map(([key, value]) => `${key}=${value}`)
    .join(',')

  return cacheControlValue
}

export default async (req: any, res: any, next: Function): Promise<any> => {
  if (!process.server)
    return
  appendHeader(res, 'Cache-Control', cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5,
  }))
  next()
}
