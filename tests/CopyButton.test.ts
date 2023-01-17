import { CopyButton } from '$lib'
import { doc_query, sleep } from 'tests'
import { expect, test, vi } from 'vitest'

test.each([
  [``, ``],
  [`some code`, `color: red;`],
])(`CopyButton switches state when clicked`, async (content, style) => {
  new CopyButton({ target: document.body, props: { content, style } })

  const btn = doc_query(`button`)

  expect(btn).toBeInstanceOf(HTMLButtonElement)
  expect(btn.textContent?.trim()).toBe(`Copy`)
  expect(btn.style.cssText).toBe(style)

  vi.stubGlobal(`navigator`, { clipboard: { writeText: vi.fn() } }) // mock clipboard
  btn.click()
  await sleep()
  expect(btn.style.cssText).toBe(style)
  expect(btn.textContent?.trim()).toBe(`Copied`)
  expect(navigator.clipboard.writeText).toBeCalledWith(content)
})

test(`CopyButton throws error when clipboard is not available`, async () => {
  vi.stubGlobal(`navigator`, {}) // reset clipboard mock

  new CopyButton({ target: document.body, props: { content: `text` } })

  console.error = vi.fn()
  const btn = doc_query(`button`)
  btn.click()
  await sleep()
  expect(btn.textContent?.trim()).toBe(`Error`)
  expect(console.error).toHaveBeenCalledOnce()
  // expect(console.error).toHaveBeenCalledWith(
  //   `[TypeError: Cannot read properties of undefined (reading 'writeText')],`
  // )
})
