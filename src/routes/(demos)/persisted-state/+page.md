This example demonstrates the new Svelte 5 state management functions that persist values to browser storage. The `persisted_state` function saves to localStorage or sessionStorage, with `local_state` and `session_state` as convenient shortcuts.

```svelte example
<script>
  import { beforeUpdate } from 'svelte'
  import { persisted_state, local_state, session_state, url_param_state } from '$lib/state.svelte.ts'

  const key = 'state-demo'
  const local_persisted = persisted_state(key, 'some initial value', 'localStorage')
  const session_persisted = persisted_state(key, 'some initial value', 'sessionStorage')

  // Convenience functions
  const local_convenient = local_state('local-demo', 'initial local value')
  const session_convenient = session_state('session-demo', 'initial session value')

  // URL parameter state
  const url_param = url_param_state('demo-param', 'default url value')

  let local_storage_value, session_storage_value
  beforeUpdate(() => {
    if (typeof localStorage !== 'undefined') {
      local_storage_value = localStorage[key]
      session_storage_value = sessionStorage[key]
    }
  })
</script>

<h3>Persisted State</h3>
<p>
  <label>
    This input saves to <code>localStorage</code>
    <input bind:value={local_persisted.value} />
  </label>
</p>
<code>localStorage value: {local_storage_value}</code>

<p>
  <label>
    This input saves to <code>sessionStorage</code>
    <input bind:value={session_persisted.value} />
  </label>
</p>
<code>sessionStorage value: {session_storage_value}</code>

<h3>Convenience Functions</h3>
<p>
  <label>
    Local state (localStorage):
    <input bind:value={local_convenient.value} />
  </label>
</p>

<p>
  <label>
    Session state (sessionStorage):
    <input bind:value={session_convenient.value} />
  </label>
</p>

<h3>URL Parameter State</h3>
<p>
  <label>
    URL parameter state (syncs with URL):
    <input bind:value={url_param.value} />
  </label>
</p>
<p>Current URL param value: <code>{url_param.value}</code></p>
```
