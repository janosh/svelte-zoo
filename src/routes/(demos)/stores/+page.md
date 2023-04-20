## `persisted_store`

This examples reads the store value for a `persisted_store` straight back from `localStorage`. The initial value only applies if no previous value was found in storage. The 3rd argument `type` defaults to `localStorage` but also supports `sessionStorage`.

```svelte example
<script>
  import { beforeUpdate } from 'svelte'
  import { persisted_store } from '$lib'

  const key = 'store-name'
  const local_store = persisted_store(key, 'some initial value')
  const session_store = persisted_store(
    key,
    'some initial value',
    'sessionStorage'
  )

  let local_value, session_value
  beforeUpdate(() => {
    local_value = localStorage[key]
    session_value = sessionStorage[key]
  })
</script>

<p>
  <label>
    This input saves to <code>localStorage</code>
    <input bind:value={$local_store} />
  </label>
</p>
<code>local_value={local_value}</code>

<p>
  <label>
    This input saves to <code>sessionStorage</code>
    <input bind:value={$session_store} />
  </label>
</p>
<code>session_value={session_value}</code>
```
