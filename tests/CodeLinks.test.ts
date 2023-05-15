import { CodeLinks } from '$lib'
import { repository } from '$root/package.json'
import { expect, test } from 'vitest'
import { doc_query } from '.'

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

test.each([[`_blank`], [`_self`]])(
  `applies target=%s to all links`,
  (target) => {
    new CodeLinks({ target: document.body, props: { target } })

    for (const link of document.querySelectorAll(`a`)) {
      expect(link.target, `${link} has wrong target`).toBe(target)
    }
  }
)
