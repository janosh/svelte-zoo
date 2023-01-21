import { beforeEach, vi } from 'vitest'

beforeEach(() => {
  document.body.innerHTML = ``
})

export async function sleep(ms = 1) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function doc_query<T extends HTMLElement>(selector: string): T {
  const node = document.querySelector(selector)
  if (!node) throw new Error(`No element found for selector: ${selector}`)
  return node as T
}

// mock the SvelteKit $app/stores module
// https://github.com/sveltejs/kit/issues/5525#issuecomment-1186390654
vi.mock(`$app/stores`, async () => {
  const { readable } = await import(`svelte/store`)
  const getStores = () => ({
    page: readable({
      url: new URL(`http://localhost`),
      params: {},
      route: { id: `test` },
    }),
  })
  const page = {
    subscribe(fn: (value: unknown) => void) {
      return getStores().page.subscribe(fn)
    },
  }
  return { getStores, page }
})
