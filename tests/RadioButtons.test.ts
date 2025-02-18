import { RadioButtons } from '$lib'
import { mount, tick } from 'svelte'
import { expect, test, vi } from 'vitest'
import { doc_query } from '.'
import Test2WayBind from './Test2WayBind.svelte'

test(`2-way binding of RadioButtons`, async () => {
  const onselected = vi.fn()
  mount(Test2WayBind, {
    target: document.body,
    props: { Component: RadioButtons, options: [1, 2, 3], onselected },
  })

  // test internal change to selected binds outwards

  doc_query(`div.zoo-radio-btn > label > input`).click()
  await tick()

  expect(onselected).toHaveBeenCalledTimes(1)
})

test(`RadioButtons forwards update and click events`, async () => {
  const onchange = vi.fn()
  const onclick = vi.fn()
  mount(RadioButtons, {
    target: document.body,
    props: { options: [1, 2, 3], onchange, onclick },
  })

  expect(onchange).not.toHaveBeenCalled()
  expect(onclick).not.toHaveBeenCalled()

  doc_query(`div.zoo-radio-btn > label > input`).click()
  await tick()

  expect(onchange).toHaveBeenCalledOnce()
  expect(onclick).toHaveBeenCalledOnce()
})

test.each([[true], [false]])(
  `disabled RadioButtons can't be changed`,
  async (disabled) => {
    const onselected = vi.fn()
    mount(Test2WayBind, {
      target: document.body,
      props: {
        Component: RadioButtons,
        options: [1, 2, 3],
        disabled,
        onselected,
      },
    })

    const input = doc_query(`div.zoo-radio-btn > label > input`)
    input.click()
    await tick()

    expect(onselected, JSON.stringify({ disabled })).toHaveBeenCalledWith(
      disabled ? null : 1,
    )
  },
)
