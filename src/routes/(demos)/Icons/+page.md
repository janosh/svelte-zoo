```svelte example
<script>
  import * as icons from '$lib/icons'
</script>

<ol>
  {#each Object.entries(icons) as [key, Icon]}
    <li>
      {key}
      <Icon width="2em" />
    </li>
  {/each}
</ol>

<style>
  ol {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    list-style: none;
    place-content: center;
  }
  ol > li {
    display: grid;
    justify-items: center;
    background-color: rgba(255, 255, 255, 0.1);
    gap: 1ex;
    width: 5em;
    padding: 1ex;
    box-sizing: border-box;
    border-radius: 4pt;
  }
</style>
```
