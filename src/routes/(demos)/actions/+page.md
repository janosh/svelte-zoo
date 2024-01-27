## `actions`

This pages demos Svelte actions in `svelte-zoo`.

### `sortable`

This action applies to bob-standard HTML tables to make them sortable by clicking on column headers (and clicking again to toggle sorting direction).

```svelte example
<script>
  import { sortable } from '$lib'
  import { beforeUpdate } from 'svelte'

  const people = [
    { name: 'Alice', age: 25, weight: 55 , eye_color: 'blue' },
    { name: 'Bob', age: 27, weight: 65 , eye_color: 'brown' },
    { name: 'Charlie', age: 30, weight: 75 , eye_color: 'green' },
    { name: 'Dave', age: 35, weight: 85 , eye_color: 'blue' },
    { name: 'Eve', age: 40, weight: 95 , eye_color: 'brown' },
    { name: 'Frank', age: 45, weight: 105 , eye_color: 'green' },
  ]
</script>

<table use:sortable>
  <thead>
    <tr>
      {#each Object.keys(people[0]) as column}
        <th>{column}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each people as person}
      <tr>
        {#each Object.values(person) as value}
          <td>{value}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
```

### `highlight_matches`

This action highlights substrings of DOM context that match a given string.

```svelte example
<script>
  import { highlight_matches } from '$lib'

  let query = 'quick'
  const css_class = 'highlight-match'
</script>

<input bind:value={query} />
<p use:highlight_matches={{ query, css_class }}>
  The quick brown fox jumps over the lazy dog
</p>

<style>
  ::highlight(highlight-match) {
    color: mediumaquamarine;
    text-decoration: underline;
  }
</style>
```
