import adapter from '@sveltejs/adapter-static'
import { mdsvex } from 'mdsvex'
import preprocess from 'svelte-preprocess'

export default {
  extensions: [`.svelte`, `.md`],

  preprocess: [preprocess(), mdsvex({ extensions: [`.md`] })],

  kit: {
    adapter: adapter(),
  },
}
