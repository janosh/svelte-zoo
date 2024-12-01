import { Confetti } from '$lib'
import { mount } from 'svelte'
import { describe, expect, test } from 'vitest'
import { doc_query } from '.'

describe(`Confetti`, () => {
  test.each([[20], [undefined]])(
    `emoji appear on mount function`,
    (n_items) => {
      mount(Confetti, { target: document.body, props: { n_items } })
      const wrapper = doc_query(`div`)
      expect(wrapper.children.length).toBe(n_items ?? 50)
      expect(new Set(wrapper.textContent)).toStrictEqual(
        new Set([`✨`, `🥳`, `🎉`]),
      )
    },
  )
})
