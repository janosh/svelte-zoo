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
  export let file: string | null = `src/routes${$page.route?.id}` // defaults to path of file serving the current page
  // can be prefixed with git ref (branch, tag, or SHA) to point to specific revision (e.g. master, v1.0.0, 73f70eb), defaults to `-` which
  // points to HEAD of the repo's default branch
  // set to '' to link to repo itself, not any of its files
  // TODO makes bad assumption about file path ending in .svx
  // https://github.com/sveltejs/kit/issues/8318
  export let btn_text: { repl?: string; github?: string; stackblitz?: string } | null = {}
  export let target: '_blank' | '_self' = `_blank`

  $: repo_handle = repo.split(`/`).slice(-2).join(`/`)

  const links = { target, rel: `noreferrer`, class: `btn` }

  $: if (stackblitz == true && !file) {
    throw new Error(`stackblitz=true requires passing 'file' prop`)
  }
</script>

{#if repl}
  <a href={repl} {...links} title="Svelte REPL">
    <Icon icon="Svelte" />
    {#if btn_text?.repl}{btn_text.repl}{/if}
  </a>
{/if}

{#if github && repo}
  {@const href = `${repo}/blob/-/${typeof github == `string` ? github : file}`}
  <a {href} {...links} title="GitHub">
    <Icon icon="GitHub" />
    {#if btn_text?.github}{btn_text.github}{/if}
  </a>
{/if}

{#if stackblitz && repo_handle}
  <!-- file param defaults to path of file serving the current page if stackblitz=true -->
  {@const uri = encodeURIComponent(stackblitz == true ? file : stackblitz)}
  {@const stackblitz_url = `https://stackblitz.com/github/${repo_handle}`}
  <a href="{stackblitz_url}?file={uri}" {...links} title="StackBlitz">
    <Icon icon="StackBlitz" />
    {#if btn_text?.stackblitz}{btn_text.stackblitz}{/if}
  </a>
{/if}

<style>
  :where(a) {
    display: inline-flex;
    gap: var(--zoo-codelinks-icon-gap, 4pt);
  }
  :where(a + a) {
    margin: var(--zoo-codelinks-btn-margin, 0 0 0 9pt);
  }
</style>
