import { Client } from '@notionhq/client'

export default function (NOTION_API_KEY: string) {
  return new Client({
    auth: NOTION_API_KEY,
  })
}
