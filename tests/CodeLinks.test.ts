import { CodeLinks } from '$lib'
import { repository as repo } from '$root/package.json'
import { mount } from 'svelte'
import { describe, expect, test } from 'vitest'
import { doc_query } from '.'

const file = `src/lib/CodeLinks.svelte`

describe.each([[true], [file]] as const)(
  `renders links for stackblitz=%s`,
  (stackblitz) => {
    test.each([[true], [file]] as const)(`github=%s`, (github) => {
      const repl = `https://svelte.dev/repl`
      const props = { repo, github, repl, stackblitz, file }

      mount(CodeLinks, { target: document.body, props })

      const github_link = doc_query(`a[href*='${repo}']`)
      expect(github_link).toBeInstanceOf(HTMLAnchorElement)
      const repl_link = doc_query(`a[href*='${repl}']`)
      expect(repl_link).toBeInstanceOf(HTMLAnchorElement)

      let url_params = ``
      if (typeof stackblitz == `string`) {
        url_params = `?file=${encodeURIComponent(stackblitz)}`
      }
      const repo_handle = repo.split(`/`).slice(-2).join(`/`)
      const stackblitz_link = doc_query(
        `a[href*='https://stackblitz.com/github/${repo_handle}${url_params}']`,
      )
      expect(stackblitz_link).toBeInstanceOf(HTMLAnchorElement)
    })
  },
)

test.each([[`_blank`], [`_self`]] as const)(
  `applies target=%s to all links`,
  (target) => {
    mount(CodeLinks, { target: document.body, props: { target } })

    for (const link of document.querySelectorAll(`a`)) {
      expect(link.target, `${link} has wrong target`).toBe(target)
    }
  },
)
