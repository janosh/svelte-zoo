<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { CopyButton, GitHubCorner } from '$lib'
  import { repository } from '$root/package.json'
  import { demos } from '$site/stores'
  import type { Snippet } from 'svelte'
  import { CmdPalette } from 'svelte-multiselect'
  import '../app.css'

  interface Props {
    children?: Snippet<[]>
  }
  let { children }: Props = $props()

  const routes = Object.keys(import.meta.glob(`./**/+page.{svelte,md}`))

  const actions = routes.map((filename) => {
    const parts = filename.split(`/`).filter((part) => !part.startsWith(`(`)) // remove hidden route segments
    const route = parts.length === 2 ? `/` : `/${parts.slice(1, -1).join(`/`)}`
    return { label: route, action: () => goto(route) }
  })

  $demos = Object.keys(import.meta.glob(`./*demos*/**/+page*.{md,svelte}`)).map(
    (filename) => `/` + filename.split(`/`).at(-2),
  )

  if ($demos.length < 3) {
    console.error(`Too few demo routes found: ${$demos.length}`)
  }
</script>

<GitHubCorner href={repository} />
<CopyButton global />
<CmdPalette {actions} placeholder="Go to..." />

{#if !$page.error && $page.url.pathname !== `/`}
  <a href="." aria-label="Back to index page">&laquo; home</a>
{/if}

{@render children?.()}

<style>
  a[href='.'] {
    font-size: 15pt;
    position: absolute;
    top: 2em;
    left: 2em;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 1pt 5pt;
    border-radius: 3pt;
    transition: 0.2s;
  }
  a[href='.']:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
</style>
