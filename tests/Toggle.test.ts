import { Toggle } from '$lib'
import { doc_query } from 'tests'
import { expect, test } from 'vitest'

test.each([
  [true, null],
  [false, `id`],
])(`Toggle switches state when clicked`, (required, id) => {
  new Toggle({ target: document.body, props: { required, id } })

  expect(document.querySelector(`input:checked`)).toBeNull()

  doc_query(`label`).click()
  const input = doc_query<HTMLInputElement>(`input`)
  expect(input).toBeInstanceOf(HTMLInputElement)
  expect(input.required).toBe(required)
  expect(input.id).toBe(id ?? ``)
})
