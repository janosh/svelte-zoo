import { CodeExample } from '$lib'
import { repository as repo } from '$root/package.json'
import { doc_query, sleep } from 'tests'
import { expect, test, vi } from 'vitest'

const [id, src] = [`uniq-id`, `some code`]

test.each([[true, false]])(
  `CodeExample toggles class .open on code section on button click`,
  async (collapsible) => {
    const meta = { collapsible, id }

    new CodeExample({ target: document.body, props: { meta, src } })

    expect(doc_query(`div.code-example#${id}`)).toBeInstanceOf(HTMLDivElement)

    if (collapsible) {
      expect(document.querySelector(`section.open`)).toBeNull()
      doc_query(`nav > button`).click()
      await sleep()
      expect(document.querySelector(`section.open`)).toBeInstanceOf(HTMLElement)
    }
  }
)

test(`test calls clipboard.writeText with src when clicking the copy button`, () => {
  new CodeExample({ target: document.body, props: { src } })

  navigator.clipboard = { writeText: vi.fn() } // mock clipboard
  doc_query(`section > aside > button`).click()
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith(src)
})

test(`test renders a code section with the src`, () => {
  new CodeExample({ target: document.body, props: { src } })

  expect(doc_query(`section > pre > code`).textContent).toBe(src)
})

test(`replaces $lib import with package name if passed as meta.pkg`, async () => {
  const src = `import { foo } from '$lib'`
  const pkg = `svelte-zoo`
  const expected = src.replace(`$lib`, pkg)

  new CodeExample({ target: document.body, props: { src, meta: { pkg } } })

  await sleep(10)

  expect(doc_query(`section > pre > code`).textContent).toBe(expected)
})

const [github, stackblitz, repl] = [true, true, `https://svelte.dev/repl`]

test.each([
  [{}, 0],
  [{ github, repo }, 1],
  [{ stackblitz }, 0],
  [{ github }, 0],
  [{ stackblitz, github }, 0],
  [{ stackblitz, github, repo }, 2],
  [{ stackblitz, repo }, 2],
  [{ repl, github }, 1],
])(`renders GitHub link if passed meta.github`, (meta, n_expected) => {
  new CodeExample({
    target: document.body,
    props: { src, meta },
  })

  const code_links = document.querySelector(`section > aside`)
  expect(code_links?.querySelectorAll(`a`), code_links?.innerHTML).toHaveLength(
    n_expected
  )
})