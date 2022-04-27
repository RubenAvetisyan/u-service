/* eslint-disable no-console */
import { Client } from '@notionhq/client'
// import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'

// interface C { id: string; Name: {}; path: {}; url: string; services?: {}[] }

// interface Results {
//   results?: C[] | Object[]
// }

export declare interface Link {
  id: string
  name?: string
  path?: string
  imgUrl?: string
  services?: {}[]
  url?: string
  cover?: string
}

// interface Details {
//   client: Client
//   query<T extends object, D extends string>(database_id: D, options?: T): Promise<QueryDatabaseResponse> | null
//   getRelatedServices<T extends [] & { id: string }[]>(relations: T): Promise<Link[][] | undefined>
//   getLinksFromResults(results: {}[]): Promise<Link[]>
// }

export class Notion {
  client: Client = null

  constructor(NOTION_API_KEY: string) {
    this.client = new Client({
      auth: NOTION_API_KEY,
    }) || null
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

export async function query(client, database_id, options?) {
  try {
    const pots = options || props
    return client.databases.query({ database_id, ...pots })
  }
  catch (error) {
    console.error('error: ', error)
  }
}

export async function getLinksFromResults(results) {
  const links: Link[] = []
  for (let i = 0; i < getLength(results); i++) {
    const { id, archived, properties, url = '', cover }: any = results[i]

    if (archived) continue

    const services = properties.services?.relation || []

    links.push({
      id,
      name: properties.Name.title[0].text.content,
      path: properties?.path?.url,
      imgUrl: cover?.external?.url || cover?.file?.url,
      services,
      url,
    })
  }
  return links
}

function getLength(arr) {
  return arr.length
}

export async function getRelatedServices(relations) {
  console.log('relations: ', relations[0])
  if (!relations) return undefined
  const results = await Promise.all(relations.map(async(relation) => {
    const database_id = relation.id

    const database = await query(database_id, props)

    return getLinksFromResults(database.results)
  }))

  return results
}
