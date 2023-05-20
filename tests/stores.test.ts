import {
  local_store,
  persisted_store,
  session_store,
  url_param_store,
} from '$lib'
import { get } from 'svelte/store'
import { beforeEach, expect, test } from 'vitest'

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
})

test.each([
  [local_store, `localStorage`],
  [session_store, `sessionStorage`],
  [persisted_store, `localStorage`],
  [persisted_store, `sessionStorage`],
] as const)(`store tests`, (store_factory, type) => {
  const testName = `test_${type}`
  const initialValue = `initial_${type}`
  const newValue = `new_${type}`
  const suffix = `_suffix_${type}`
  const store =
    store_factory === persisted_store
      ? store_factory(testName, initialValue, type)
      : store_factory(testName, initialValue)

  expect(get(store)).toBe(initialValue)
  expect(window[type][testName]).toBe(`"${initialValue}"`)

  store.set(newValue)
  expect(get(store)).toBe(newValue)
  expect(window[type][testName]).toBe(`"${newValue}"`)

  store.update((val) => val + suffix)
  expect(get(store)).toBe(newValue + suffix)
  expect(window[type][testName]).toBe(`"${newValue}${suffix}"`)
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
