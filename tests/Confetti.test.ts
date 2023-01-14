import { Confetti } from '$lib'
import { doc_query } from 'tests'
import { describe, expect, test } from 'vitest'

describe(`Confetti`, () => {
  test.each([[20], [undefined]])(
    `emoji appear on mount function`,
    (n_items) => {
      new Confetti({ target: document.body, props: { n_items } })
      const wrapper = doc_query(`div`)
      expect(wrapper.children.length).toBe(n_items ?? 50)
      expect(new Set(wrapper.textContent)).toStrictEqual(
        new Set([`✨`, ` `, `🥳`, `🎉`])
      )
    }
  )
})
