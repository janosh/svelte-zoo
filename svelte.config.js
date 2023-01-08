import adapter from '@sveltejs/adapter-static'
import { mdsvex } from 'mdsvex'
import examples from 'mdsvexamples'
import preprocess from 'svelte-preprocess'

const { default: pkg } = await import(`./package.json`, {
  assert: { type: `json` },
})
const defaults = {
  Wrapper: `/src/lib/CodeExample.svelte`,
  pkg: pkg.name,
  repo: pkg.repository,
}
const remarkPlugins = [[examples, { defaults }]]

/** @type {import('@sveltejs/kit').Config} */
export default {
  extensions: [`.svelte`, `.md`],

  preprocess: [preprocess(), mdsvex({ extensions: [`.md`], remarkPlugins })],

  kit: {
    adapter: adapter(),
  },
}
