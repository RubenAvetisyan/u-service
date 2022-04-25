/* eslint-disable no-console */
import { Client } from '@notionhq/client'
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'

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
}

class Notion {
  readonly client: Client
  constructor(NOTION_API_KEY: string) {
    this.client = new Client({
      auth: NOTION_API_KEY,
    })
  }
}

export class NotionQuery extends Notion {
  public options: Object

  constructor(NOTION_API_KEY: string) {
    super(NOTION_API_KEY)

    this.options = {
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
  }

  query(database_id: string, options?: {}): Promise<QueryDatabaseResponse> {
    try {
      return this.client.databases.query({ database_id, ...(options || this.options) })
    }
    catch (error) {
      console.error('error: ', error)
    }
  }

  async getRelatedServices(relations: { id: string }[]): Promise<Link[][] | undefined> {
    console.log('relations: ', relations[0])
    if (!relations) return undefined
    const results = await Promise.all(relations.map(async(relation) => {
      const database_id = relation.id

      const database = await this.query(database_id, this.options)

      return this.getLinksFromResults(database.results)
    }))

    return results
  }

  async getLinksFromResults(results): Promise<Link[]> {
    const links: Link[] = []
    for (let i = 0; i < this.getLength(results); i++) {
      const { id, archived, properties, url, cover }: any = results[i]

      if (archived) continue

      const services = properties.services?.relation

      links.push({
        id,
        name: properties.Name.title[0].text.content,
        path: properties.path.url,
        imgUrl: cover?.external?.url || cover?.file?.url,
        services,
        url,
      })
    }
    return links
  }

  getLength(arr) {
    return arr.length
  }
}
