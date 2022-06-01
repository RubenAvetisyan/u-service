/* eslint-disable no-console */
import { Client } from '@notionhq/client'
import { SearchResponse, GetDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import { errorHandler } from './helpers'
// import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'

// interface C { id: string; Name: {}; path: {}; url: string; services?: {}[] }

// interface Results {
//   results?: C[] | Object[]
// }

export declare interface Link {
  id: string
  parent_db_Id: string
  parentServiceId: string
  parentId: string | null
  name?: string
  path?: string
  imgUrl?: string
  services?: {}
  url?: string
  cover?: string
  dbImgUrl?: [] | string
}

// interface Details {
//   client: Client
//   query<T extends object, D extends string>(database_id: D, options?: T): Promise<QueryDatabaseResponse> | null
//   getRelatedServices<T extends [] & { id: string }[]>(relations: T): Promise<Link[][] | undefined>
//   getLinksFromResults(results: {}[]): Promise<Link[]>
// }

type SearFilter = {
  property: "object";
  value: "page" | "database";
} | undefined

type searchSort = {
  timestamp: "last_edited_time";
  direction: "ascending" | "descending";
} | undefined

type SearchStartCursor = string | undefined

interface SearchOptions {
  filter?: SearFilter
  sort?: searchSort
  start_cursor?: SearchStartCursor
}

export class Notion {
  client: Client | null = null

  constructor(NOTION_API_KEY: string) {
    if (!NOTION_API_KEY) return errorHandler(501, `Expected NOTION_API_KEY, but got ${NOTION_API_KEY} as ${typeof NOTION_API_KEY}`)

    this.client = new Client({
      auth: NOTION_API_KEY,
    })
  }

  async search(query: string, options?: SearchOptions) {
    if (!this.client) return errorHandler(400, 'notion.so client not found')

    return this.client.search({ query, ...options })
  }

  searchTransform(searchResult: SearchResponse, cb?: Function) {
    const result = searchResult.results.map(({ id }) => id)
    return cb ? cb(searchResult) : result
  }

  retrivePage(pageId: string) {
    if (!this.client) return errorHandler(400, 'notion.so client not found')

    return this.client.pages.retrieve({ page_id: pageId })
  }
}

const props = {
  filter: {
    and: [
      {
        property: 'Status',
        checkbox: {
          equals: true,
        },
      },
    ],
  },
  sorts: [
    {
      property: 'order',
      direction: 'ascending',
    },
  ],
}

export async function query(client: any, database_id: string, options?: { filter: {} }) {
  try {
    const filters = options || props
    const queryResult = client.databases.query({ database_id, ...filters })
    queryResult.then((res: any) => console.log('queryResult: ', res))
    return queryResult
  }
  catch (error) {
    console.error('error: ', error)
  }
}

export async function retrieveDb(client: any, database_id: string) {
  return client.databases.retrieve({ database_id })
}

export async function retrievePage(client: any, page_id: string) {
  return await client.pages.retrieve({ page_id })
}

type ParentId = string
export async function getLinksFromResults(results = [], parent_db_Id: ParentId = '') {
  const links = {} as { [key: string]: any }
  for (let i = 0; i < getLength(results); i++) {
    const { id, parent, archived, properties, url = '', cover }: any = results[i]

    if (archived)
      continue

    // const parentService = filterByObjectKey(results[i], 'db_parent_', result => result.map(([_, val]) => {
    //   return val.relation.database_id
    // })) as string[]

    const dbImgUrls = properties?.img_url?.files || null
    const childPaths = properties.child_props?.rollup.array.map(({ url }: any) => url) || []

    links[id] = {
      parent_db_Id: '',
      db_Id: parent.database_id,
      parentServiceId: '',
      name: properties.Name.title[0].text.content,
      path: properties?.path?.url,
      childPaths,
      imgUrl: cover?.external?.url || cover?.file?.url,
      dbImgUrl: dbImgUrls?.length ? dbImgUrls[0].external?.url : '',
      services: {},
      url,
      order: properties?.order?.number || i,
    }

    links[id].parent_db_Id = parent_db_Id

    // setting services
    const childeServices = Object.entries(properties).filter(([key]) => key.includes('db_child_')).map(([_, val]) => val) as { relation: { id: string }[] }[]

    if (childeServices[0]?.relation)
      childeServices[0].relation.forEach(({ id: serviceId }) => links[id].services[serviceId] = {})

    const parentService = Object.entries(properties).filter(([key]) => key.includes('db_parent_')).map(([_, val]) => val) as { relation: { id: string }[] }[]

    if (parentService[0]?.relation)
      parentService[0].relation.forEach(({ id: relationId }) => links[id].parentServiceId = relationId)
  }
  return links
}

function getLength(arr: any[]) {
  return arr?.length || 0
}

export async function getRelatedServices(client: any, relations: { [key: string]: any }[]) {
  console.log('relations: ', relations[0])
  if (!relations)
    return undefined
  const results = await Promise.all(relations.map(async (relation) => {
    const database_id = relation.id

    const database = await query(client, database_id, props)

    return getLinksFromResults(database.results)
  }))

  return results
}

export type SetRelationFilter = {
  property: string
  relation: {
    contains: string
  }
} | never

interface Relations {
  parent?: string[]
  children?: string[]
  [key: string]: any
}

export const setRelationFilter = (relations: Relations): [] | SetRelationFilter[] => {
  const and: SetRelationFilter[] = []
  const property: string = Object.keys(relations)[0] === 'parent' ? 'parent_database' : 'child_database'
  const values = Object.values(relations[Object.keys(relations)[0]]) as any[]
  values.forEach((value: string) => {
    and.push({
      property,
      relation: {
        contains: value,
      },
    })
  })

  return and
}
