import { redirect } from '@sveltejs/kit'
import type { LayoutLoad } from './$types'

export const prerender = true

export const _demo_routes = Object.keys(
  import.meta.glob(`./*/+page.{svx,md,svelte}`)
)
  .map((filename) => filename.split(`/`)[1])
  .filter((name) => ![`contributing`, `changelog`].includes(name))

if (_demo_routes.length < 2) {
  throw new Error(`Too few demo routes found: ${_demo_routes.length}`)
}

export const load: LayoutLoad = ({ url }) => {
  if (url.pathname.endsWith(`.md`)) {
    throw redirect(307, url.pathname.replace(/\.md$/, ``))
  }
}
