import * as zoo from '$lib'
import * as icons from '$lib/icons'
import { expect, test } from 'vitest'

test(`src/lib/index.ts re-exports all Svelte components`, () => {
  const components = Object.keys(import.meta.glob(`$lib/*.svelte`)).map(
    (path) => path.split(`/`).pop()?.split(`.`).shift()
  )
  expect(Object.keys(zoo)).toStrictEqual(components)
})

test(`src/lib/icons/index.ts re-exports all icons`, () => {
  const components = Object.keys(import.meta.glob(`$lib/icons/*.svelte`)).map(
    (path) => path.split(`/`).pop()?.split(`.`).shift()
  )
  expect(Object.keys(icons)).toStrictEqual(components)
})
