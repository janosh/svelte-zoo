<script lang="ts">
  import GitHubCorner from '$lib/GitHubCorner.svelte'
  import Readme from '$root/readme.md'
  import '../app.css'

  const demo_routes = Object.keys(import.meta.glob(`./*/+page.{svx,svelte,md}`)).map(
    (filename) => filename.split(`/`)[1]
  )
</script>

<GitHubCorner
  href="https://github.com/janosh/svelte-zoo"
  --ghc-bg="white"
  --ghc-color="var(--page-bg)"
/>

<Readme>
  <svelte:fragment slot="nav">
    <h2>📝 &thinsp; Component Demos</h2>
    <nav>
      {#each demo_routes as route, idx}
        {#if idx > 0}<strong>&ensp;&bull;&ensp;</strong>{/if}<a href={route}>{route}</a>
      {/each}
    </nav>
  </svelte:fragment>
</Readme>
