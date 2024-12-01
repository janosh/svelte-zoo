import { Toggle } from '$lib'
import { mount } from 'svelte'
import { expect, test } from 'vitest'
import { doc_query } from '.'

test.each([
  [true, ``, ``],
  [false, `id`, `color: red;`],
])(`Toggle switches state when clicked`, (required, id, style) => {
  mount(Toggle, { target: document.body, props: { required, id, style } })

  expect(document.querySelector(`input:checked`)).toBeNull()

  const label = doc_query(`label`)
  label.click()
  const input = doc_query<HTMLInputElement>(`input`)
  expect(input).toBeInstanceOf(HTMLInputElement)
  expect(input.required).toBe(required)
  expect(input.id).toBe(id ?? ``)
  expect(label.style.cssText).toBe(style)
})
