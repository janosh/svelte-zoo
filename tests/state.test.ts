import {
  local_state,
  persisted_state,
  session_state,
  url_param_state,
} from '$lib/state.svelte'
import { beforeEach, describe, expect, test } from 'vitest'

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
  window.history.replaceState({}, ``, `/`)
})

describe(`state management`, () => {
  test.each([
    [`local_state`, local_state],
    [`session_state`, session_state],
    [`persisted_state`, persisted_state],
  ])(`%s creates reactive state`, (name, state_fn) => {
    const state = state_fn(`test_key`, `initial`)
    expect(state.value).toBe(`initial`)

    state.value = `updated`
    expect(state.value).toBe(`updated`)
  })

  test(`url_param_state syncs with URL`, () => {
    const state = url_param_state(`test_param`, `default`)
    expect(state.value).toBe(`default`)

    state.value = `new_value`
    expect(window.location.search).toContain(`test_param=new_value`)
  })

  test(`persisted_state handles JSON parsing errors`, () => {
    const invalid_json = `{invalid json`
    localStorage.setItem(`error_key`, invalid_json)

    const state = persisted_state(`error_key`, `fallback`)
    expect(state.value).toBe(`fallback`)
  })

  test(`persisted_state handles complex objects`, () => {
    const complex_obj = { nested: { value: 42 }, array: [1, 2, 3] }
    const state = persisted_state(`complex_key`, complex_obj)

    expect(state.value).toEqual(complex_obj)

    const extended_obj = { ...complex_obj, new_prop: `added` }
    state.value = extended_obj
    expect((state.value as typeof extended_obj).new_prop).toBe(`added`)
  })

  test(`persisted_state handles arrays`, () => {
    const array_value = [`a`, `b`, `c`]
    const state = persisted_state(`array_key`, array_value)

    expect(state.value).toEqual(array_value)

    state.value = [...array_value, `d`]
    expect(state.value).toEqual([`a`, `b`, `c`, `d`])
  })

  test(`persisted_state handles primitive types`, () => {
    const number_state = persisted_state(`number_key`, 42)
    const boolean_state = persisted_state(`boolean_key`, true)

    expect(number_state.value).toBe(42)
    expect(boolean_state.value).toBe(true)

    number_state.value = 100
    boolean_state.value = false

    expect(number_state.value).toBe(100)
    expect(boolean_state.value).toBe(false)
  })

  test(`url_param_state handles special characters`, () => {
    const special_value = `hello world & more!`
    const state = url_param_state(`special_param`, special_value)

    expect(state.value).toBe(special_value)
    expect(window.location.search).toContain(
      `special_param=hello%2520world%2520%2526%2520more%21`,
    )
  })

  test(`url_param_state handles empty values`, () => {
    const state = url_param_state(`empty_param`, ``)
    expect(state.value).toBe(``)

    state.value = `not_empty`
    expect(state.value).toBe(`not_empty`)
  })

  test(`url_param_state preserves other parameters`, () => {
    window.history.replaceState({}, ``, `?existing=value`)

    const state = url_param_state(`new_param`, `new_value`)
    state.value = `updated`

    expect(window.location.search).toContain(`existing=value`)
    expect(window.location.search).toContain(`new_param=updated`)
  })

  test(`multiple state instances work independently`, () => {
    const state1 = persisted_state(`multi_key1`, `value1`)
    const state2 = persisted_state(`multi_key2`, `value2`)

    state1.value = `updated1`
    state2.value = `updated2`

    expect(state1.value).toBe(`updated1`)
    expect(state2.value).toBe(`updated2`)
  })

  test(`state persists across simulated reloads`, () => {
    const state = persisted_state(`persist_key`, `initial`)
    state.value = `persisted_value`

    const new_state = persisted_state(`persist_key`, `fallback`)
    expect(new_state.value).toBe(`persisted_value`)
  })

  test(`state handles undefined and null values`, () => {
    const state = persisted_state<string | null | undefined>(`null_key`, null)
    expect(state.value).toBe(null)

    state.value = undefined
    expect(state.value).toBe(undefined)

    state.value = `back_to_string`
    expect(state.value).toBe(`back_to_string`)
  })
})
