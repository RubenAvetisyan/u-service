/* eslint-disable no-console */
import type { ClientRequest, ServerResponse } from 'http'
import errorHandler from '../utils/erroeHandler'
import type { Link } from '../utils/notion-db-query'
import { NotionQuery } from '../utils/notion-db-query'

const { query, getLinksFromResults } = new NotionQuery(process.env.NOTION_API_KEY)

const database_id = process.env.NOTION_DATABASE_MAIN_SECTIONS_ID
export default async(req: ClientRequest, res: ServerResponse): Promise<{ links: Link[] }> => {
  const links: Link[] = []
  try {
    if (req.method === 'POST') {
      // Todo: handle post
      res.statusCode = 200
      res.end()
    }
    else {
      const { results } = await query(database_id)

      return {
        links: await getLinksFromResults(results),
      }
    }
  }
  catch (error: unknown) {
    if (error instanceof TypeError) {
      console.log('error: ', error)
    }
    else {
      // notionErrorHandler
      errorHandler(error)
      // eslint-disable-next-line no-undef
      throwError('😱 Oh no, an error has been thrown.')
    }

    return {
      links,
    }
  }
}
