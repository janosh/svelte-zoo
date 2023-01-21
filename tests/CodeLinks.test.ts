import { CodeLinks } from '$lib'
import { repository } from '$root/package.json'
import { doc_query } from 'tests'
import { expect, test } from 'vitest'

test.each([[true], [`src/lib/CodeLinks.svelte`]])(`CodeLinks`, (file) => {
  const props = {
    repo: repository,
    github: file,
    repl: `https://svelte.dev/repl`,
    stackblitz: file,
    file,
  }
  const { repo, repl, stackblitz, github } = props
  new CodeLinks({ target: document.body, props })
  const repo_handle = repo.split(`/`).slice(-2).join(`/`)

  expect(doc_query(`a[href='${repo}/blob/-/${github}']`)).toBeInstanceOf(
    HTMLAnchorElement
  )
  expect(doc_query(`a[href='${repl}']`)).toBeInstanceOf(HTMLAnchorElement)
  expect(
    doc_query(
      `a[href='https://stackblitz.com/github/${repo_handle}?file=${encodeURIComponent(
        stackblitz
      )}']`
    )
  ).toBeInstanceOf(HTMLAnchorElement)
})

test.each([[null], [``]])(
  `raises error on stackblitz=true and no file`,
  (file) => {
    expect(() => {
      new CodeLinks({
        target: document.body,
        props: { stackblitz: true, file },
      })
    }).toThrow(`stackblitz=true requires passing 'file' prop`)
  }
)

test.each([[`_blank`], [`_self`]])(
  `applies target prop to all links`,
  (target) => {
    new CodeLinks({ target: document.body, props: { target } })

    for (const link of document.querySelectorAll(`a`)) {
      expect(link.target, `${link} has wrong target`).toBe(target)
    }
  }
)
