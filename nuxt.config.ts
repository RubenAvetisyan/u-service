// import { booleanLiteral, stringLiteral } from '@babel/types'
import { booleanLiteral, stringLiteral } from '@babel/types'
import { defineNuxtConfig } from 'nuxt'

// const isDev = process.env.NODE_ENV === 'development'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  publicRuntimeConfig: {
    baseUrl: '/',
  },

  privateRuntimeConfig: {
    baseUrl: '/',
    NOTION_API_KEY: process.env.NOTION_API,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
    NOTION_DATABASE_MAIN_SECTIONS_ID: process.env.NOTION_DATABASE_MAIN_SECTIONS_ID,
    NOTION_MAIN_PAGE_ID: process.env.NOTION_MAIN_PAGE_ID,
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  experimental: {
    reactivityTransform: true,
    // viteNode: true,
  },
  css: ['@/assets/styles/main.css'],
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
  unocss: {
    preflight: true,
    icons: true,
  },
  colorMode: {
    classSuffix: '',
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
