export type StorageType = `localStorage` | `sessionStorage`

export function persisted_state<T>(
  name: string,
  initial: T,
  type: StorageType = `localStorage`,
) {
  // Load initial value from storage if available
  let stored_value = initial
  if (typeof window !== `undefined`) {
    const stored = window[type].getItem(name)
    if (stored) {
      try {
        stored_value = JSON.parse(stored)
      } catch {
        // If parsing fails, use initial value and set it to storage
        stored_value = initial
        window[type].setItem(name, JSON.stringify(initial))
      }
    } else {
      // If nothing in storage, set the initial value
      window[type].setItem(name, JSON.stringify(initial))
    }
  }

  let state = $state(stored_value)

  return {
    get value() {
      return state
    },
    set value(new_value: T) {
      state = new_value
      // Sync to storage on change
      if (typeof window !== `undefined`) {
        window[type].setItem(name, JSON.stringify(new_value))
      }
    },
  }
}

export const local_state = <T>(name: string, initial: T) =>
  persisted_state(name, initial, `localStorage`)

export const session_state = <T>(name: string, initial: T) =>
  persisted_state(name, initial, `sessionStorage`)

export function url_param_state(name: string, initial: string | null = null) {
  // Load initial value from URL if available
  let url_value = initial
  if (typeof location !== `undefined`) {
    const url = new URL(location.toString())
    const param = url.searchParams.get(name)
    if (param) {
      url_value = decodeURIComponent(param)
    } else if (initial) {
      // If no param in URL but we have an initial value, set it
      url.searchParams.set(name, encodeURIComponent(initial))
      history.replaceState({}, ``, url)
    }
  }

  let state = $state(url_value)

  return {
    get value() {
      return state
    },
    set value(new_value: string | null) {
      state = new_value
      // Sync to URL on change
      if (typeof location !== `undefined`) {
        const url = new URL(location.toString())
        if (new_value) {
          url.searchParams.set(name, encodeURIComponent(new_value))
        } else {
          url.searchParams.delete(name)
        }
        history.replaceState({}, ``, url)
      }
    },
  }
}
