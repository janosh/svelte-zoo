<script lang="ts">
  import { page } from '$app/state'
  import { PrevNext } from '$lib'
  import { name } from '$root/package.json'
  import { DemoNav } from '$site'
  import { demos } from '$site/stores'
  import type { Snippet } from 'svelte'

  interface Props {
    children?: Snippet<[]>
  }
  let { children }: Props = $props()
</script>

<h1>
  <img src="favicon.svg" alt={name} height="50" width="50" />&ensp;Svelte Zoo
</h1>

<main>
  <DemoNav style="place-content: center;" />

  {@render children?.()}

  <PrevNext items={$demos} current={page.url.pathname} />
</main>

<style>
  h1 {
    text-align: center;
    display: flex;
    place-content: center;
    place-items: center;
  }
</style>
