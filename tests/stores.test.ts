import { persisted_store, url_param_store, type StorageType } from '$lib'
import { get } from 'svelte/store'
import { expect, test } from 'vitest'

test.each([[`localStorage`], [`sessionStorage`]])(
  `persisted_store`,
  (type: StorageType) => {
    const store = persisted_store(`test`, `initial`, type)
    expect(get(store)).toBe(`initial`)
    expect(window[type][`test`]).toBe(`"initial"`)

    store.set(`new`)
    expect(get(store)).toBe(`new`)
    expect(window[type][`test`]).toBe(`"new"`)

    store.update((val) => val + `_suffix`)
    expect(get(store)).toBe(`new_suffix`)
    expect(window[type][`test`]).toBe(`"new_suffix"`)
  }
)

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
