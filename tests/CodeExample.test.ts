import { CodeExample } from '$lib'
import { doc_query } from 'tests'
import { expect, test, vi } from 'vitest'

test.each([[true, false]])(`CodeExample`, (collapsible) => {
  const meta = {
    collapsible,
    id: `uniq-id`,
  }
  const { id } = meta
  const src = `some code`

  new CodeExample({ target: document.body, props: { meta, src } })

  expect(doc_query(`div#${id}`)).toBeInstanceOf(HTMLDivElement)
})

vi.mock(`$app/stores`, async () => {
  const { readable } = await import(`svelte/store`)
  const getStores = () => ({
    page: readable({ url: new URL(`http://localhost`), params: {} }),
  })
  const page = {
    subscribe(fn: (value: unknown) => void) {
      return getStores().page.subscribe(fn)
    },
  }
  return { getStores, page }
})
