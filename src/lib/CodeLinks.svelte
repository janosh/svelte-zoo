<script lang="ts">
  import { Icon } from '$lib'

  interface Props {
    repo?: string // GitHub repo URL ref can be branch, tag, or SHA
    // (master, v1.0.0, 73f70eb), defaults to `-` which
    // points to HEAD of the repo's default branch
    repl?: string | null
    // https://github.com/<user>/<repo>/blob/<branch>, e.g. https://github.com/sveltejs/kit/blob/master
    github?: string | boolean
    stackblitz?: string | boolean | null
    file?: string // path to file in repo can be prefixed with git ref
    // (branch, tag, or SHA) to point to specific revision (e.g. master, v1.0.0, 73f70eb),
    // defaults to `-` which points to HEAD of the repo's default branch
    // if left at default '', will link to repo itself, not any of its files
    // related: https://github.com/sveltejs/kit/issues/8318
    btn_text?: { repl?: string; github?: string; stackblitz?: string } | null
    target?: `_blank` | `_self`
    margin?: string | null
    padding?: string | null
  }
  let {
    repo = ``,
    repl = null,
    github = Boolean(repo),
    stackblitz = null,
    file = ``,
    btn_text = {},
    target = `_blank`,
    margin = null,
    padding = null,
  }: Props = $props()

  let repo_handle = $derived(repo?.split(`/`).slice(-2).join(`/`))

  const links = { target, rel: `noreferrer`, class: `btn` }
</script>

{#if repl}
  <a href={repl} {...links} title="Svelte REPL" style:padding style:margin>
    <Icon icon="Svelte" />
    {#if btn_text?.repl}{btn_text.repl}{/if}
  </a>
{/if}

{#if github && repo}
  {@const href = file ? `${repo}/blob/-/${github == true ? file : github}` : repo}
  <a {href} {...links} title="GitHub" style:padding style:margin>
    <Icon icon="GitHub" />
    {#if btn_text?.github}{btn_text.github}{/if}
  </a>
{/if}

{#if stackblitz && repo_handle}
  <!-- file param defaults to path of file serving the current page if stackblitz=true -->
  {@const uri = encodeURIComponent(stackblitz == true ? file : stackblitz)}
  {@const stackblitz_url = `https://stackblitz.com/github/${repo_handle}`}
  <a
    href="{stackblitz_url}?file={uri}"
    {...links}
    title="StackBlitz"
    style:padding
    style:margin
  >
    <Icon icon="StackBlitz" />
    {#if btn_text?.stackblitz}{btn_text.stackblitz}{/if}
  </a>
{/if}

<style>
  :where(a) {
    display: inline-flex;
    gap: var(--zoo-codelinks-icon-gap, 4pt);
    margin: var(--zoo-codelinks-btn-margin);
    padding: var(--zoo-codelinks-btn-padding);
  }
</style>
