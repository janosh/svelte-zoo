import { writable } from 'svelte/store'

export type StorageType = 'localStorage' | 'sessionStorage'

export function persisted_store<T>(
  name: string,
  initial: T,
  type: StorageType = `localStorage`
) {
  function set_storage_val(name: string, val: T, type: StorageType) {
    if (typeof window !== `undefined`) {
      window[type][name] = JSON.stringify(val)
    }
  }

  // runs during store initialization
  if (typeof window !== `undefined`) {
    if (window[type][name]) {
      // if the value is already in storage, use that
      initial = JSON.parse(window[type][name])
    } else {
      // else set it
      set_storage_val(name, initial, type)
    }
  }

  const { set, update, ...store } = writable(initial)

  return {
    ...store,
    set: (val: T) => {
      set_storage_val(name, val, type)
      set(val)
    },
    update: (fn: (val: T) => T) => {
      update((val) => {
        const new_val = fn(val)
        set_storage_val(name, new_val, type)
        return new_val
      })
    },
  }
}

export const local_store = <T>(name: string, initial: T) =>
  persisted_store(name, initial, `localStorage`)

export const session_store = <T>(name: string, initial: T) =>
  persisted_store(name, initial, `sessionStorage`)

export function url_param_store(name: string, initial: string | null) {
  function set_url_param(name: string, val: string | null) {
    const url = new URL(location.toString())
    if (val) url.searchParams.set(name, encodeURIComponent(val))
    else url.searchParams.delete(name)
    history.replaceState({}, ``, url)
  }
  if (typeof location !== `undefined`) {
    const val = new URL(location.toString()).searchParams.get(name)
    if (val) initial = decodeURIComponent(val)
    else set_url_param(name, initial)
  }

  const { set, update, ...store } = writable(initial)

  return {
    ...store,
    set: (val: string | null) => {
      set_url_param(name, val)
      set(val)
    },
    update: (fn: (val: string | null) => string | null) => {
      update((val) => {
        const new_val = fn(val)
        set_url_param(name, new_val)
        return new_val
      })
    },
  }
}
