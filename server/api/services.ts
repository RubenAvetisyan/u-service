/* eslint-disable no-console */
import type { ServerResponse } from 'http'
import errorHandler from '../utils/erroeHandler'
import type { Link } from '../utils/notion-db-query'
import { Notion, getLinksFromResults, query } from '../utils/notion-db-query'

const notion = new Notion(process.env.NOTION_API_KEY)

export default async(req, res: ServerResponse): Promise<{ links: Link[]; cover: string }> => {
  const links: Link[] = []
  try {
    if (req.method === 'GET' && req.body && req.body.services) {
      const services = req.body.services.map(({ id }) => id)
      const { results } = await query(notion.client, 'd4af2b073c0e4d9ea64f85b72a23db0c')
      // Promise.all(req.body.services.map(async({ id }) => {
      //   const service =
      //   return service
      // }))

      const links = await getLinksFromResults(results)

      return links.filter(({ id }) => services.includes(id))
    }
  }
  catch (error: unknown) {
    if (error instanceof TypeError) {
      console.log('error: ', error)
    }
    else {
      console.log('error: ', error)
      // notionErrorHandler
      errorHandler(error)
      // eslint-disable-next-line no-undef
      // throwError('😱 Oh no, an error has been thrown.')
    }

    return {
      links,
      cover,
    }
  }
}
