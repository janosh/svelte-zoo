import { sveltekit } from '@sveltejs/kit/vite'
import { UserConfig } from 'vite'

const vite_config: UserConfig = {
  plugins: [sveltekit()],

  server: {
    fs: {
      allow: [`..`], // needed to import readme.md in src/routes/index.svelte
    },
    port: 3000,
  },

  preview: {
    port: 3000,
  },
}
export default vite_config
