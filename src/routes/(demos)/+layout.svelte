<script lang="ts">
  import { page } from '$app/stores'
  import { PrevNext } from '$lib'
  import { name } from '$root/package.json'
  import { DemoNav } from '$site'
  import { demos } from '$site/stores'

  $demos = Object.keys(import.meta.glob(`./**/+page*.{svx,md,svelte}`)).map(
    (filename) => `/` + filename.split(`/`).at(-2)
  )

  if ($demos.length < 3) {
    console.error(`Too few demo routes found: ${$demos.length}`)
  }
</script>

<h1>
  <img src="favicon.svg" alt={name} height="50" width="50" />&ensp;Svelte Zoo
</h1>

<main>
  <DemoNav style="place-content: center;" />

  <slot />

  <PrevNext routes={$demos} current={$page.url.pathname} />
</main>

<style>
  h1 {
    text-align: center;
    display: flex;
    place-content: center;
    place-items: center;
  }
</style>
