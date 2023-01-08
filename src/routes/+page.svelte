<script lang="ts">
  import Readme from '$root/readme.md'
  import { _demo_routes } from './+layout'
</script>

<Readme>
  <svelte:fragment slot="nav">
    <h2>📝 &thinsp; Component Demos</h2>
    <nav>
      {#each _demo_routes as route, idx}
        {#if idx > 0}<strong>&ensp;&bull;&ensp;</strong>{/if}<a href={route}>{route}</a>
      {/each}
    </nav>
  </svelte:fragment>
</Readme>
