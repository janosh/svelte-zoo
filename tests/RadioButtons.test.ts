import { RadioButtons } from '$lib'
import { doc_query, sleep } from 'tests'
import { expect, test, vi } from 'vitest'
import Test2WayBind from './Test2WayBind.svelte'

test(`2-way binding of RadioButtons`, async () => {
  const binder = new Test2WayBind({
    target: document.body,
    props: { component: RadioButtons, options: [1, 2, 3] },
  })

  // test internal change to selected binds outwards
  let detail = {}
  binder.$on(`selected-changed`, (e: CustomEvent) => {
    detail = e.detail
  })
  const cb = vi.fn()
  binder.$on(`selected-changed`, cb)

  doc_query(`div.zoo-radio-btn > label > input`).click()
  await sleep()

  expect(detail).toStrictEqual({ selected: 1 })
  expect(cb).toHaveBeenCalledOnce()
})
