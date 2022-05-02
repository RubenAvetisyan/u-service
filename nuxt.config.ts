
import { booleanLiteral, stringLiteral } from '@babel/types'
import { defineNuxtConfig } from 'nuxt3'

const isDev = process.env.NODE_ENV === 'development'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  publicRuntimeConfig: {
    baseUrl: isDev ? 'http://localhost:3000/' : '/',
  },

  privateRuntimeConfig: {
    NOTION_API_KEY: process.env.NOTION_API,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
    NOTION_DATABASE_MAIN_SECTIONS_ID: process.env.NOTION_DATABASE_MAIN_SECTIONS_ID,
  },

  components: {
    dirs: [
      {
        path: '~/components',
        extensions: ['vue'],
        prefix: 'r',
      },
      {
        path: '~/content-components',
        extensions: ['vue'],
        prefix: 'content',
      },
    ],
  },

  buildModules: ['@unocss/nuxt', '@vueuse/core/nuxt', '@nuxt/ui'],

  css: ['@/assets/styles/main.css'],

  unocss: {
    preflight: true,
    icons: true,
  },

  vite: {
    define: {
      'process.server': booleanLiteral,
      'process.env.BASE_URL': stringLiteral,
      'process.env.NOTION_API': stringLiteral,
      'process.env.NOTION_DATABASE_ID': stringLiteral,
    },
  },
})
