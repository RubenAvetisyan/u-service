/* eslint-disable no-console */
import { defineEventHandler, getRouterParams } from 'h3'
import errorHandler from '../../utils/erroeHandler'
import type { Link, SetRelationFilter } from '../../utils/notion-db-query'
import { Notion, getLinksFromResults, retrieveDb, setRelationFilter } from '../../utils/notion-db-query'
import { filterByObjectKey, getLastParam } from '../../utils/helpers'
import { cache } from '../../server-cache'


interface Filters {
  filter: {
    and?: SetRelationFilter[]
  }
}

const filters: Filters = {
  filter: {},
}

interface Query {
  db_id?: string
  services?: string[]
  parent?: string | null
}

const NOTION_API_KEY = process.env.NOTION_API_KEY

const notion = NOTION_API_KEY ? new Notion(NOTION_API_KEY) : null

export default defineEventHandler(async (event) => {
  if (!notion) {
    return setResponseStatus(400, '😱 Something goes wrong!!!')
  }
  const links: Link | {} = {}
  try {

    // const pageResponse = await notion.retrivePage('c0275da0-c309-4e56-b800-1640a89f5207')
    const { params } = getRouterParams(event)
    if (!params) return links
    const path = getLastParam(params[0])

    if (cache.isInCache(path)) {
      const childeServices = cache.getFromCache('childe-services')
      const result = { links: cache.getFromCache(path), childeServices }

      return result
    } else {
      const q: Query = getQuery(event)

      // Must be like 'd4af2b073c0e4d9ea64f85b72a23db0c'
      if (!q?.db_id || !Reflect.ownKeys(q).length)
        return {}

      filters.filter.and = setRelationFilter(q.parent ? { parent: [q.parent] } : { children: q.services || [] })

      const [{ properties: retrive = [] }, query] = await Promise.all([
        retrieveDb(notion.client, q.db_id),
        notion.query(q.db_id),
      ])

      const results: any = query?.results || []
      // console.log('query results: ', results);

      // const pageId = results[0].url.replace('https://www.notion.so/', '')
      // console.log('pageId: ', pageId);
      // const page = await notion.retrivePage(pageId)

      // const block = await notion.blocks('85e2177532ce424ebe1b04993ad983de')
      // console.log('block: ', block)

      const childeServices: any = filterByObjectKey(
        retrive,
        'db_child_',
        (result: [key: string, val: any][]) => result.map((value): { key: string; value: Record<string, any> } => {
          // if (val.relation?.database_id)
          //   return val.relation.database_id

          // return { key, value: val }
          const resultPropValue = value[1]
          return resultPropValue?.relation?.database_id || ''
        }),
      )

      const parentService = filterByObjectKey(
        retrive,
        'db_parent_',
        (result: [key: string, val: any][]) => result.map(([_, val]) => {
          return val?.relation?.database_id || ''
        }).filter(s => s),
      ) as string[]

      const links = await getLinksFromResults(results, parentService[0])

      // childeServices = childeServices && childeServices[0]?.length ? childeServices[0][1].relation.database_id : []

      // cache.setCache(path, links)
      // cache.setCache('childe-services', childeServices)
      // console.log('cache size: ', cache.size(), 'last time', Date.now().toLocaleString())

      return { links, childeServices }
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
    }
  }
})
