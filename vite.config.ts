import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact({
      babel: {
        plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
      },
    }),
  ],
  base: '/bojoke/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          remirror: [
            '@remirror/core',
            '@remirror/pm',
            '@remirror/react',
            'remirror',
          ],
          prosemirror: [
            '@benrbray/prosemirror-math',
            'prosemirror-commands',
            'prosemirror-inputrules',
            'prosemirror-keymap',
            'prosemirror-model',
            'prosemirror-state',
            'prosemirror-transform',
            'prosemirror-view',
          ],
        },
      },
    },
  },
});
