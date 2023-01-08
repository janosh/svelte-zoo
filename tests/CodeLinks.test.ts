import { CodeLinks } from '$lib'
import { repository } from '$root/package.json'
import { doc_query } from 'tests'
import { expect, test } from 'vitest'

test(`CodeLinks`, () => {
  const file = `-/src/lib/CodeLinks.svelte`
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
