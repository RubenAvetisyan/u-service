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
  rules: [
    [/^animate-(.*)$/, ([_, match], { theme }) => {
      if (match.startsWith('shape')) {
        return {
          animation: match + ' ' + theme.extend.animation.shape
        }
      }
    }],
  ],
  theme: {
    extend: {
      animation: {
        'shape': '2s ease-in-out infinite alternate both',
      } as { [key: string]: string },
    }
  }
})

// {
//   from: {
//     opacity: '0',
//       transform: 'translate3d(-100 %, 0, 0)',
//         },
//   to: {
//     opacity: '1',
//       transform: 'translate3d(0, 0, 0)',
//         }
// }
