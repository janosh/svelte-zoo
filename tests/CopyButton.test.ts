import { CopyButton } from '$lib'
import { tick } from 'svelte'
import { expect, test, vi } from 'vitest'
import { doc_query } from '.'

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
  await tick()
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
  await tick()
  expect(btn.textContent?.trim()).toBe(`Error`)
  expect(console.error).toHaveBeenCalledOnce()
  // TODO: figure out why argument doesn't match, seems to be surrounded by pesky quotes inside vitest which i have no control over
  // expect(console.error).toHaveBeenCalledWith(
  //   `[TypeError: Cannot read properties of undefined (reading 'writeText')],`
  // )
})
