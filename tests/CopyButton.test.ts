import { CopyButton } from '$lib'
import { tick } from 'svelte'
import { beforeEach, expect, test, vi } from 'vitest'
import { doc_query } from '.'

beforeEach(() => {
  document.body.innerHTML = ``
  vi.resetAllMocks()
})

test.each([
  [``, ``],
  [`some code`, `color: red;`],
])(`CopyButton functionality`, async (content, style) => {
  new CopyButton({ target: document.body, props: { content, style } })
  const btn = doc_query(`button`)

  expect(btn).toBeInstanceOf(HTMLButtonElement)
  expect(btn.textContent?.trim()).toBe(`Copy`)
  expect(btn.style.cssText).toBe(style)

  // Test successful copy
  vi.stubGlobal(`navigator`, { clipboard: { writeText: vi.fn() } }) // mock clipboard
  btn.click()
  await tick()
  expect(btn.textContent?.trim()).toBe(`Copied`)
  expect(navigator.clipboard.writeText).toBeCalledWith(content)

  // Test clipboard error
  vi.stubGlobal(`navigator`, {
    clipboard: {
      writeText: vi.fn().mockRejectedValue(new Error(`Clipboard error`)),
    },
  })
  console.error = vi.fn()
  btn.click()
  await tick()
  expect(btn.textContent?.trim()).toBe(`Error`)
  expect(console.error).toHaveBeenCalledOnce()
})

test(`CopyButton with custom labels`, async () => {
  const labels = {
    default: { icon: `CustomCopy`, text: `CustomCopy` },
    success: { icon: `CustomCheck`, text: `CustomCopied` },
    error: { icon: `CustomError`, text: `CustomAlert` },
  }

  new CopyButton({
    target: document.body,
    props: { content: `custom text`, labels },
  })
  const btn = doc_query(`button`)

  expect(btn.textContent?.trim()).toBe(`CustomCopy`)

  vi.stubGlobal(`navigator`, { clipboard: { writeText: vi.fn() } })
  btn.click()
  await tick()
  expect(btn.textContent?.trim()).toBe(`CustomCopied`)

  vi.stubGlobal(`navigator`, {
    clipboard: {
      writeText: vi.fn().mockRejectedValue(new Error(`Clipboard error`)),
    },
  })
  btn.click()
  await tick()
  expect(btn.textContent?.trim()).toBe(`CustomAlert`)
})
