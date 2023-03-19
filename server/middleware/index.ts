/* eslint-disable no-console */
import { appendHeader, H3Event } from 'h3'

const cacheControl = (values: {}) => {
  const cacheControlValue = Object.entries(values)
    .map(([key, value]) => `${key}=${value}`)
    .join(',')

  return cacheControlValue
}

export default defineEventHandler(async (event: H3Event) => {
  if (!process.server)
    return
  appendHeader(event, 'Cache-Control', cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5,
  }))
  return
})