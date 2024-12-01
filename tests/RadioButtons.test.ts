import { RadioButtons } from '$lib'
import { mount, tick } from 'svelte'
import { expect, test, vi } from 'vitest'
import { doc_query } from '.'
import Test2WayBind from './Test2WayBind.svelte'

test(`2-way binding of RadioButtons`, async () => {
  const selected_changed = vi.fn()
  mount(Test2WayBind, {
    target: document.body,
    props: { component: RadioButtons, options: [1, 2, 3] },
    events: { 'selected-changed': selected_changed },
  })

  // test internal change to selected binds outwards

  doc_query(`div.zoo-radio-btn > label > input`).click()
  await tick()

  expect(selected_changed).toHaveBeenCalledTimes(2)
})

test(`RadioButtons forwards update and click events`, async () => {
  const change = vi.fn()
  const click = vi.fn()
  mount(RadioButtons, {
    target: document.body,
    props: { options: [1, 2, 3] },
    events: { change, click },
  })

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
    const selected_changed = vi.fn()
    mount(Test2WayBind, {
      target: document.body,
      props: { component: RadioButtons, options: [1, 2, 3], disabled },
      events: { 'selected-changed': selected_changed },
    })

    const input = doc_query(`div.zoo-radio-btn > label > input`)
    input.click()
    await tick()

    expect(
      selected_changed,
      JSON.stringify({ disabled }),
    ).toHaveBeenCalledTimes(disabled ? 1 : 2)
  },
)
