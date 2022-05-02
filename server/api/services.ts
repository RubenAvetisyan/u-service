/* eslint-disable no-console */
import type { ServerResponse } from 'http'
// import { useQuery } from 'h3'
import errorHandler from '../utils/erroeHandler'
import type { Link } from '../utils/notion-db-query'
import { Notion, getLinksFromResults, query } from '../utils/notion-db-query'

const notion = new Notion(process.env.NOTION_API_KEY)

export default async(req, res: ServerResponse): Promise<{ links: Link[] } | [] | {}[]> => {
  const links: Link[] = []
  try {
    if (req.method === 'GET') {
      // const q = useQuery(req)
      // if (!q) res.end()
      // console.log('q: ', q)

      // if (!q || !q?.services?.length) return []
      const { results } = await query(notion.client, 'd4af2b073c0e4d9ea64f85b72a23db0c')

      const links = await getLinksFromResults(results)
      // links = links.filter(({ id }) => q.services.includes(id))

      return links
    }
    else {
      // Todo: handle post
      res.statusCode = 200
      res.end()
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
    }
  }
}
