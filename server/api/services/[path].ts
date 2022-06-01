/* eslint-disable no-console */
import type { ServerResponse } from 'http'
import type { IncomingMessage } from 'h3'
import { defineEventHandler } from 'h3'
import errorHandler from '../../utils/erroeHandler'
import type { Link, SetRelationFilter } from '../../utils/notion-db-query'
import { Notion, getLinksFromResults, query, retrieveDb, setRelationFilter } from '../../utils/notion-db-query'
import { filterByObjectKey } from '../../utils/helpers'

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
  const req: IncomingMessage = event.req
  const res: ServerResponse = event.res


  if (!notion) {
    res.statusCode = 400
    res.end()
    return throwError('😱 Something goes wrong!!!')
  }
  const links: Link | {} = {}
  try {
    if (req.method === 'GET') {
      const response = await notion.search('services', { filter: { value: 'database', property: 'object' } })


      const pageResponse = await notion.retrivePage('c0275da0-c309-4e56-b800-1640a89f5207')


      const q: Query = useQuery(event.req)


      if (!q?.db_id || !Reflect.ownKeys(q).length)
        return {}

      filters.filter.and = setRelationFilter(q.parent ? { parent: [q.parent] } : { children: q.services || [] })

      const [{ properties: retrive = [] }, { results }] = await Promise.all([
        retrieveDb(notion.client, q.db_id),
        query(notion.client, q.db_id),
      ]) // 'd4af2b073c0e4d9ea64f85b72a23db0c'


      let childeServices: any = filterByObjectKey(
        retrive,
        'db_child_',
        (result: [key: string, val: any][]) => {
          result.map(([key, val]): { key: string; value: Record<string, any> } => {
            if (val.relation?.database_id)
              return val.relation.database_id

            return { key, value: val }
          })
        },
      )


      const parentService = filterByObjectKey(
        retrive,
        'db_parent_',
        (result: [key: string, val: any][]) => result.map(([_, val]) => {
          return val.relation.database_id
        }),
      ) as string[]

      const links = await getLinksFromResults(results, parentService[0])

      childeServices = childeServices && childeServices[0]?.length ? childeServices[0][1].relation.database_id : []

      return { links, childeServices }
    }
    else {
      // Todo: handle post
      res.statusCode = 200
      res.end()
    }
  }
  catch (error: unknown) {
    if (error instanceof TypeError) {

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
