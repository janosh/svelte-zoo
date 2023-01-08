import adapter from '@sveltejs/adapter-static'
import { mdsvex } from 'mdsvex'
import examples from 'mdsvexamples'
import preprocess from 'svelte-preprocess'

const remarkPlugins = [
  [examples, { defaults: { Wrapper: `/src/lib/CodeExample.svelte` } }],
]

/** @type {import('@sveltejs/kit').Config} */
export default {
  extensions: [`.svelte`, `.md`],

  preprocess: [preprocess(), mdsvex({ extensions: [`.md`], remarkPlugins })],

  kit: {
    adapter: adapter(),
  },
}
