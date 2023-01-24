import { writable } from 'svelte/store'

export function session_store<T>(name: string, initial: T) {
  function set_session_val(name: string, val: T) {
    if (typeof sessionStorage !== `undefined`) {
      sessionStorage[name] = JSON.stringify(val)
    }
  }
  if (typeof sessionStorage !== `undefined`) {
    if (sessionStorage[name]) initial = JSON.parse(sessionStorage[name])
    else set_session_val(name, initial)
  }

  const { set, update, ...store } = writable(initial)

  return {
    ...store,
    set: (val: T) => {
      set_session_val(name, val)
      set(val)
    },
    update: (fn: (val: T) => T) => {
      update((val) => {
        const new_val = fn(val)
        set_session_val(name, new_val)
        return new_val
      })
    },
  }
}

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
