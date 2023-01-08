<script lang="ts">
  import { page } from '$app/stores'
  import { Icon } from '$lib'

  export let repo = `` // GitHub repo URL
  // ref can be branch, tag, or SHA (master, v1.0.0, 73f70eb), defaults to `-` which
  // points to HEAD of the repo's default branch
  export let repl: string | null = null
  // https://github.com/<user>/<repo>/blob/<branch>, e.g. https://github.com/sveltejs/kit/blob/master
  export let github: string | boolean = Boolean(repo)
  export let stackblitz: string | boolean | null = null
  export let file: string | null = `src/routes${$page.url.pathname}/+page.svx` // defaults to path of file serving the current page
  // can be prefixed with git ref (branch, tag, or SHA) to point to specific revision (e.g. master, v1.0.0, 73f70eb), defaults to `-` which
  // points to HEAD of the repo's default branch
  // set to '' to link to repo itself, not any of its files
  // TODO makes bad assumption about file path ending in .svx
  // https://github.com/sveltejs/kit/issues/8318

  $: repo_handle = repo.split(`/`).slice(-2).join(`/`)
  $: serving_file = `src/routes${$page.url.pathname}/+page.svx`

  const links = { target: `_blank`, rel: `noreferrer`, class: `btn` }
</script>

{#if repl}
  <a href={repl} {...links}>
    <Icon icon="Svelte" />
    REPL
  </a>
{/if}

{#if github && repo}
  {@const href = `${repo}/blob/-/${typeof github == `string` ? github : file}`}
  <a {href} {...links}>
    <Icon icon="GitHub" />
    &thinsp;GitHub
  </a>
{/if}

{#if stackblitz && repo_handle}
  <!-- file param defaults to path of file serving the current page if stackblitz=true -->
  {@const file = encodeURIComponent(stackblitz == true ? serving_file : stackblitz)}
  {@const stackblitz_url = `https://stackblitz.com/github/${repo_handle}`}
  <a href="{stackblitz_url}?file={file}" {...links}>
    <Icon icon="StackBlitz" />
    StackBlitz
  </a>
{/if}
