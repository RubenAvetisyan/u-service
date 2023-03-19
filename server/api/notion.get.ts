import { defineEventHandler, setResponseStatus } from 'h3';
/* eslint-disable no-console */
import { getQuery } from 'h3'
import errorHandler from '../utils/erroeHandler'
import type { Link } from '../utils/notion-db-query'
import { Notion, getLinksFromResults, query, retrieveDb, retrievePage } from '../utils/notion-db-query'
import type { FilterByObjectKey } from '../utils/helpers'
import { filterByObjectKey } from '../utils/helpers'

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

const NOTION_API_KEY = process.env.NOTION_API_KEY

const notion = NOTION_API_KEY ? new Notion(NOTION_API_KEY) : null
// const { query, getLinksFromResults } = notion

const database_id = process.env.NOTION_DATABASE_MAIN_SECTIONS_ID || ''
const mainPageId = process.env.NOTION_MAIN_PAGE_ID || ''

interface Response {
  links?: Record<string, Link>
  cover?: string
  childeServices?: FilterByObjectKey | []
}

type R = unknown | Response
export default defineEventHandler(async (event) => {
  if (!notion) {
    return setResponseStatus(event, 400, 'error')
  }

  let links = {}

  try {

    const q = getQuery(event)
    let newCover = ''

    if (!cover && q?.fp) {
      const pages = await retrievePage(notion.client, mainPageId)
      const { cover }: Pages = Object.assign({ cover: null }, pages)

      newCover = cover?.external?.url || cover?.file?.url || ''
    }
    // notion.client.pages.retrive()
    const [{ properties: retrive = [] }, { results }] = await Promise.all([
      retrieveDb(notion.client, database_id),
      query(notion.client, database_id),
    ])

    const childeServices = filterByObjectKey(retrive, 'db_child_', (result: [key: string, value: any][]) => result.map(([key, val]): Record<string, {}> => {
      if (val.relation?.database_id)
        return val.relation.database_id

      return { key, value: val }
    }))

    links = await getLinksFromResults(results)

    return {
      cover: newCover || '',
      links,
      childeServices,
    }

  }
  catch (error: unknown) {
    if (error instanceof TypeError) {
      console.error('error: ', error)
    }
    else {
      // notionErrorHandler
      errorHandler(error)
      // eslint-disable-next-line no-undef
      // throwError('😱 Oh no, an error has been thrown.')
    }

    return {
      links,
      cover,
      childeServices: [],
    }
  }
})