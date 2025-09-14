import { defineConfig, presetUno, presetIcons, presetTypography } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        ph: () => import('@iconify-json/ph/icons.json').then(i => i.default),
        'svg-spinners': () => import('@iconify-json/svg-spinners/icons.json').then(i => i.default),
      },
    }),
    presetTypography(),
  ],
  theme: {
    colors: {
      'bolt-elements': {
        'background-depth-1': 'var(--bolt-elements-background-depth-1)',
        'background-depth-2': 'var(--bolt-elements-background-depth-2)',
        'borderColor': 'var(--bolt-elements-borderColor)',
        'textPrimary': 'var(--bolt-elements-textPrimary)',
        'textSecondary': 'var(--bolt-elements-textSecondary)',
        'textTertiary': 'var(--bolt-elements-textTertiary)',
        'prompt-background': 'var(--bolt-elements-prompt-background)',
        'item-contentAccent': 'var(--bolt-elements-item-contentAccent)',
        'item-backgroundAccent': 'var(--bolt-elements-item-backgroundAccent)',
        'loader-progress': 'var(--bolt-elements-loader-progress)',
        'icon-success': 'var(--bolt-elements-icon-success)',
        'icon-error': 'var(--bolt-elements-icon-error)',
      },
    },
    spacing: {
      'header-height': 'var(--header-height)',
      'workbench-width': 'var(--workbench-width)',
      'workbench-inner-width': 'var(--workbench-inner-width)',
      'workbench-left': 'var(--workbench-left)',
      'chat-min-width': 'var(--chat-min-width)',
    },
    zIndex: {
      'logo': 'var(--z-logo)',
      'workbench': 'var(--z-workbench)',
      'prompt': 'var(--z-prompt)',
    },
  },
  shortcuts: {
    'kdb': 'px-1.5 py-0.5 text-xs font-mono bg-bolt-elements-background-depth-2 border border-bolt-elements-borderColor rounded',
    'transition-theme': 'transition-colors duration-200',
    'bolt-ease-cubic-bezier': 'transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
  },
});