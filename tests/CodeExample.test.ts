import { CodeExample } from '$lib'
import { doc_query, sleep } from 'tests'
import { expect, test, vi } from 'vitest'

test.each([[true, false]])(`CodeExample`, async (collapsible) => {
  const [id, src] = [`uniq-id`, `some code`]
  const meta = { collapsible, id }

  new CodeExample({ target: document.body, props: { meta, src } })

  expect(doc_query(`div.code-example#${id}`)).toBeInstanceOf(HTMLDivElement)
  if (collapsible) {
    expect(document.querySelector(`section.open`)).toBeNull()
    doc_query(`nav > button`).click()
    await sleep()
    expect(document.querySelector(`section.open`)).toBeInstanceOf(HTMLElement)
  }

  navigator.clipboard = { writeText: vi.fn() } // mock clipboard
  // test calls clipboard.writeText with src when clicking the copy button
  doc_query(`section > aside > button`).click()
  await sleep()
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith(src)
})
