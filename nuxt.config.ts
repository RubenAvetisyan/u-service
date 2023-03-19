import { pwa } from './config/pwa'
import { appDescription } from './constants/index'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@nuxt/devtools',
  ],
  runtimeConfig: {
    NOTION_API_KEY: process.env.NOTION_API,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
    NOTION_DATABASE_MAIN_SECTIONS_ID: process.env.NOTION_DATABASE_MAIN_SECTIONS_ID,
    NOTION_MAIN_PAGE_ID: process.env.NOTION_MAIN_PAGE_ID,
    public: {
      baseUrl: '/',
    }
  },
  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    inlineSSRStyles: false,
  },
  css: [
    '@unocss/reset/tailwind.css',
    '@/assets/styles/main.css',
  ],
  colorMode: {
    classSuffix: '',
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    },
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
  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },
  pwa,
})
