import { expect, test } from 'vitest'

test(`all icons have fill="currentColor" and take $$props`, () => {
  for (const [key, code] of Object.entries(
    import.meta.glob(`$lib/icons/*.svelte`, { as: `raw`, eager: true })
  )) {
    expect(code, `${key} missing fill='currentColor'`).toContain(
      `fill="currentColor"`
    )
    expect(code, `${key} missing $$props`).toContain(`{...$$props}`)
  }
})

test(`all icons reference source"`, () => {
  for (const [key, code] of Object.entries(
    import.meta.glob(`$lib/icons/*.svelte`, { as: `raw`, eager: true })
  )) {
    expect(
      code.startsWith(`<!-- https://icones.js.org/collection/all?s=`),
      `${key} missing source`
    ).toBe(true)
  }
})
