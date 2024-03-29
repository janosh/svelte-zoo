import { RadioButtons } from '$lib'
import { tick } from 'svelte'
import { expect, test, vi } from 'vitest'
import { doc_query } from '.'
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
  await tick()

  expect(detail).toStrictEqual({ selected: 1 })
  expect(cb).toHaveBeenCalledOnce()
})

test(`RadioButtons forwards update and click events`, async () => {
  const change = vi.fn()
  const click = vi.fn()
  const buttons = new RadioButtons({
    target: document.body,
    props: { options: [1, 2, 3] },
  })

  buttons.$on(`change`, change)
  buttons.$on(`click`, click)

  expect(change).not.toHaveBeenCalled()
  expect(click).not.toHaveBeenCalled()

  doc_query(`div.zoo-radio-btn > label > input`).click()
  await tick()

  expect(change).toHaveBeenCalledOnce()
  expect(click).toHaveBeenCalledOnce()
})

test.each([[true], [false]])(
  `disabled RadioButtons can't be changed`,
  async (disabled) => {
    const binder = new Test2WayBind({
      target: document.body,
      props: { component: RadioButtons, options: [1, 2, 3], disabled },
    })
    const spy = vi.fn()
    binder.$on(`selected-changed`, spy)

    const input = doc_query(`div.zoo-radio-btn > label > input`)
    input.click()
    await tick()

    expect(spy).toHaveBeenCalledTimes(disabled ? 0 : 1)
  },
)
