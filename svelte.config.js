import adapter from '@sveltejs/adapter-static'
import { mdsvex } from 'mdsvex'
import preprocess from 'svelte-preprocess'

export default {
  extensions: [`.svelte`, `.md`],

  preprocess: [preprocess(), mdsvex({ extensions: [`.md`] })],

  kit: {
    adapter: adapter(),

    // hydrate the <body> element in src/app.html
    target: `body`,

    vite: {
      server: {
        // needed to import readme.md in src/routes/index.svelte
        fs: { allow: [`..`] },
      },
    },
  },
}
