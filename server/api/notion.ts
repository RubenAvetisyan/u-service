/* eslint-disable no-console */
import type { ServerResponse } from 'http'
import { useQuery } from 'h3'
import errorHandler from '../utils/erroeHandler'
import type { Link } from '../utils/notion-db-query'
import { Notion, getLinksFromResults, query } from '../utils/notion-db-query'

let cover = null

const notion = new Notion(process.env.NOTION_API_KEY)
// const { query, getLinksFromResults } = notion

const database_id = process.env.NOTION_DATABASE_MAIN_SECTIONS_ID
export default async(req, res: ServerResponse): Promise<{ links: Link[]; cover: string }> => {
  const links: Link[] = []
  try {
    if (req.method === 'POST') {
      // Todo: handle post
      res.statusCode = 200
      res.end()
    }
    else {
      const q = useQuery(req)

      if (!cover && q?.fp) {
        const pageId = '46c70845-0bad-4377-968e-0d418abdc611'
        const pages = await notion.client.pages.retrieve({ page_id: pageId })

        const newCover = pages?.cover?.external?.url
        cover = cover !== newCover ? newCover : cover
      }
      // notion.client.pages.retrive()
      const { results = {} } = await query(notion.client, database_id) || {}

      return {
        links: await getLinksFromResults(results),
        cover: cover || '',
      }
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
