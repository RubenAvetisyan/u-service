/* eslint-disable no-console */
import type { ServerResponse } from 'http'
import { useQuery } from 'h3'
import errorHandler from '../utils/erroeHandler'
import type { Link, SetRelationFilter } from '../utils/notion-db-query'
import { Notion, getLinksFromResults, query, setRelationFilter } from '../utils/notion-db-query'

interface Filters {
  filter: {
    and?: SetRelationFilter
  }
}

const filters: Filters = {
  filter: {},
}

const notion = new Notion(process.env.NOTION_API_KEY)

export default async(req, res: ServerResponse): Promise<{ links: Link[] } | [] | {}[]> => {
  const links: Link[] = []
  try {
    if (req.method === 'GET') {
      const q: { db_id?: string; services?: string[]; parent?: string | null } = useQuery(req)
      console.log('q: ', q)
      const retrieve = await notion.client.databases.retrieve({ database_id: q.db_id })
      console.log('retrieve: ', retrieve)

      if (!q || Object.keys(q).length === 0) return []
      filters.filter.and = setRelationFilter(q.parent ? { parent: [q.parent] } : { children: q.services || [] })
      console.log('filters: ', filters)
      const [retrive, results] = await query(notion.client, q.db_id, filters) // 'd4af2b073c0e4d9ea64f85b72a23db0c'
      console.log('retrive: ', retrive)
      console.log('results: ', results)

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
