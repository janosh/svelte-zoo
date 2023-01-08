<script lang="ts">
  import * as icons from '$lib/icons'
</script>

<ol>
{#each Object.entries(icons) as [key, Icon]}
  <li>
  <p>{key}</p>
  <Icon width='1em' />
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
  ol li {
    display: grid;
    justify-items: center;
  }
</style>
