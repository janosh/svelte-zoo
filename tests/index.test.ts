import * as zoo from '$lib'
import * as icons from '$lib/icons'
import { doc_query } from 'tests'
import { expect, test } from 'vitest'

test(`src/lib/index.ts re-exports all Svelte components`, () => {
  const components = Object.keys(import.meta.glob(`$lib/*.svelte`)).map(
    (path) => path.split(`/`).pop()?.split(`.`).shift()
  )
  // $lib is also allowed to export other things, so we use arrayContaining()
  expect(Object.keys(zoo)).toEqual(expect.arrayContaining(components))
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
  expect(zoo.get_bg_color(div)).toBe(`red`)
  expect(zoo.get_bg_color(par)).toBe(`green`)
  expect(zoo.get_bg_color(span)).toBe(`green`)
})
