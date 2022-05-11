/* eslint-disable no-console */
import type { ServerResponse } from 'http'
import { useQuery } from 'h3'
import errorHandler from '../utils/erroeHandler'
import type { Link } from '../utils/notion-db-query'
import { Notion, getLinksFromResults, query } from '../utils/notion-db-query'

const cover = null

interface External {
  url: string
}

interface File {
  url: string
}

interface Cover {
  file?: File
  external?: External
}

interface Pages {
  cover: Cover
}

const notion = new Notion(process.env.NOTION_API_KEY)
// const { query, getLinksFromResults } = notion

const database_id = process.env.NOTION_DATABASE_MAIN_SECTIONS_ID

interface Response {
  links: Link[]
  cover: string
  childeServices: []
}
export default async(req, res: ServerResponse): Promise<Response> => {
  const links: Link[] = []
  try {
    if (req.method === 'POST') {
      // Todo: handle post
      res.statusCode = 200
      res.end()
    }
    else {
      const q = useQuery(req)
      let newCover = ''

      if (!cover && q?.fp) {
        const pageId = '46c70845-0bad-4377-968e-0d418abdc611'
        const pages = await notion.client.pages.retrieve({ page_id: pageId })
        const { cover }: Pages = Object.assign({ cover: null }, pages)

        newCover = cover?.external?.url || cover?.file?.url
      }
      // notion.client.pages.retrive()
      const [retrive, { results }] = await query(notion.client, database_id) || []
      console.log('retrive: ', retrive)
      let children: {}[] = Object.entries(retrive.properties).filter(([key]): boolean => key.includes('db_child_'))
        .map(([key, val]): Record<string, {}> => ({ key, value: val }))
      children = children.map((prop: { value: { relation: { database_id?: string } } }) => prop.value.relation?.database_id)
      console.log('children: ', children)
      console.log('results: ', results)

      return {
        cover: newCover || '',
        links: await getLinksFromResults(results),
        childeServices: retrive,
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
      childeServices: null,
    }
  }
}
