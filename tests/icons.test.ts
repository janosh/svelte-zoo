import { Icon } from '$lib'
import { mount } from 'svelte'
import { expect, test, vi } from 'vitest'

test(`all icons have fill="currentColor" and take $$props`, () => {
  for (const [key, code] of Object.entries(
    import.meta.glob(`$lib/icons/*.svelte`, { as: `raw`, eager: true }),
  )) {
    expect(code, `${key} missing fill='currentColor'`).toContain(
      `fill="currentColor"`,
    )
    expect(code, `${key} missing $$props`).toContain(`{...$$props}`)
  }
})

test(`all icons reference source"`, () => {
  for (const [key, code] of Object.entries(
    import.meta.glob(`$lib/icons/*.svelte`, { as: `raw`, eager: true }),
  )) {
    expect(
      code.startsWith(`<!-- https://icones.js.org/collection/all?s=`),
      `${key} missing source`,
    ).toBe(true)
  }
})

test(`all icons have a viewBox`, () => {
  for (const [key, code] of Object.entries(
    import.meta.glob(`$lib/icons/*.svelte`, { as: `raw`, eager: true }),
  )) {
    expect(code, `${key} missing viewBox`).toContain(`viewBox="0 0 `)
  }
})

test.each([[``], [`foo`]])(
  `Icon component raises error on unknown icon name`,
  (icon) => {
    console.error = vi.fn()

    mount(Icon, { target: document.body, props: { icon } })

    expect(console.error).toHaveBeenCalledOnce()
    expect(console.error).toHaveBeenCalledWith(`Icon '${icon}' not found`)
  },
)
