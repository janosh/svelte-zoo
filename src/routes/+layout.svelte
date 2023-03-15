<script lang="ts">
  import { page } from '$app/stores'
  import { GitHubCorner } from '$lib'
  import { repository } from '$root/package.json'
  import { demos } from '$site/stores'
  import '../app.css'

  $demos = Object.keys(
    import.meta.glob(
      /* eslint-disable-next-line @typescript-eslint/quotes */
      './\\(demos\\)/**/+page*.{svx,md,svelte}'
    )
  ).map((filename) => `/` + filename.split(`/`).at(-2))

  if ($demos.length < 3) {
    console.error(`Too few demo routes found: ${$demos.length}`)
  }
</script>

<GitHubCorner href={repository} />

{#if !$page.error && $page.url.pathname !== `/`}
  <a href="." aria-label="Back to index page">&laquo; home</a>
{/if}

<slot />

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
