import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        ph: () => import('@iconify-json/ph/icons.json').then(i => i.default),
        'svg-spinners': () => import('@iconify-json/svg-spinners/icons.json').then(i => i.default),
      },
    }),
  ],
  shortcuts: {
    'glass-container': 'backdrop-blur-md bg-white/10 border border-white/20 rounded-lg',
    'glass-card': 'backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl shadow-xl',
    'glass-button': 'backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-300',
  },
  theme: {
    colors: {
      primary: {
        50: '#f0f9ff',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      }
    }
  }
})