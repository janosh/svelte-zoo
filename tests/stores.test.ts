import { session_store, url_param_store } from '$lib'
import { get } from 'svelte/store'
import { expect, test } from 'vitest'

test(`session_store`, () => {
  const store = session_store(`test`, `initial`)
  expect(get(store)).toBe(`initial`)
  expect(sessionStorage[`test`]).toBe(`"initial"`)

  store.set(`new`)
  expect(get(store)).toBe(`new`)
  expect(sessionStorage[`test`]).toBe(`"new"`)

  store.update((val) => val + `_suffix`)
  expect(get(store)).toBe(`new_suffix`)
  expect(sessionStorage[`test`]).toBe(`"new_suffix"`)
})

test(`url_param_store`, () => {
  const store = url_param_store(`test`, `initial`)
  // after each method call, test store and URL param value
  expect(get(store)).toBe(`initial`)
  expect(location.search).toBe(`?test=initial`)

  store.set(`new`)
  expect(get(store)).toBe(`new`)
  expect(location.search).toBe(`?test=new`)

  store.update((val) => val + `_suffix`)
  expect(get(store)).toBe(`new_suffix`)
  expect(location.search).toBe(`?test=new_suffix`)
})
