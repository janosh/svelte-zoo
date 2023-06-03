import * as lib from '$lib'
import * as icons from '$lib/icons'
import { expect, test } from 'vitest'
import { doc_query } from '.'

test(`src/lib/index.ts re-exports all Svelte components`, () => {
  const components = Object.keys(import.meta.glob(`$lib/*.svelte`)).map(
    (path) => path.split(`/`).pop()?.split(`.`).shift()
  )
  // $lib is also allowed to export other things, so we use arrayContaining()
  expect(Object.keys(lib)).toEqual(expect.arrayContaining(components))
})

test(`src/lib/icons/index.ts re-exports all icons`, () => {
  const components = Object.keys(import.meta.glob(`$lib/icons/*.svelte`)).map(
    (path) => path.split(`/`).pop()?.split(`.`).shift()
  )
  expect(Object.keys(icons)).toStrictEqual(components)
})

test(`get_bg_color() returns the background color of an element`, () => {
  document.body.innerHTML = `
    <div style="background-color: red">
      <p style="background-color: green">
        <span>child</span>
      </p>
    </div>
  `
  const div = doc_query(`div`)
  const par = doc_query(`p`)
  const span = doc_query(`span`)
  expect(lib.get_bg_color(div)).toBe(`rgb(255, 0, 0)`)
  expect(lib.get_bg_color(par)).toBe(`rgb(0, 128, 0)`)
  expect(lib.get_bg_color(span)).toBe(`rgb(0, 128, 0)`)
})

test(`range() returns an array of numbers`, () => {
  expect(lib.range(0, 5)).toStrictEqual([0, 1, 2, 3, 4])
  expect(lib.range(0, 5, 2)).toStrictEqual([0, 2, 4])
  expect(lib.range(0, 5, 3)).toStrictEqual([0, 3])
  expect(lib.range(0, 5, 5)).toStrictEqual([0])
  expect(lib.range(0, 5, 6)).toStrictEqual([0])
  expect(lib.range(0, 0.61, 0.3)).toStrictEqual([0, 0.3, 0.6])
  expect(lib.range(-3, 2)).toStrictEqual([-3, -2, -1, 0, 1])
  expect(lib.range(-3, 2, 2)).toStrictEqual([-3, -1, 1])
  expect(lib.range(-1, 1, 0.5)).toStrictEqual([-1, -0.5, 0, 0.5])
})
