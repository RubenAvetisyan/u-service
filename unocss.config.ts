import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
    ['anim-blob', 'absolute w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70'],
    ['transition-blurry-shape', 'motion-reduce:transition transition-transform duration-2000 ease-in-out'],
    ['model', 'h-screen justify-between pb-13.75 items-center'],
    ['model-nuxt-page', 'w-full mx-auto justify-center items-center'],
    ['model-main-content', 'mx-auto text-center items-center justify-center'],
    ['model-main-content-h2', 'max-w-lg mx-auto font-normal backdrop-blur-sm rounded-lg tracking-wider text-light-100 light:text-dark-100 text-3.5 pb-2'],
    ['model-content-btn-container', 'flex flex-wrap mx-auto max-w-sm md:max-w-xl items-center justify-around space-x-3.25 md:space-x-6.25 space-y-5.5 md:space-y-0 mt-4 h-40 md:h-20'],
    ['model-content-chevron', 'absolute bottom-[1rem] inset-x-0'],
    ['model-contents-container', 'snap-start h-full md:h-screen w-screen relative bg-cover bg-fixed bg-center flex flex-col text-center items-center justify-center px-4 place-content-center'],
    ['model-contents-home-menu-container', 'flex mx-auto items-center justify-center h-10 text-center content-center mb-8'],
    ['model-contents-home-menu', 'flex mx-auto text-light-blue-100 hover:text-light-100 bg-opacity-50 h-20 w-80 ma-2 rounded-xl align-center justify-center'],
    ['home-menu-first-span', 'text-light-10 text-sm font-medium text-light-300 group-hover:text-light-600 group-hover:dark:text-dark-600 dark:text-light-400'],
    ['model-contents-home-menu-description-container', 'flex mt-1 md:mt-10 pa-4 max-w-xl bg-light-100 dark:bg-dark-100 rounded-xl backdrop-blur-sm opacity-75 text-dark-400 dark:text-light-100 font-medium text-center']
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
