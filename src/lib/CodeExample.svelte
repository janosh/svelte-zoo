<script lang="ts">
  // see svelte.config.js where this component is passed to mdsvexamples
  import { name } from '$root/package.json'
  import { onMount } from 'svelte'
  import { CodeLinks, CopyButton, Icon } from '.'

  // src+meta are passed in by mdsvexamples
  export let src: string // code fence content, sadly without indentation so we prefer node?.innerText below
  export let meta: {
    // code fence metadata
    collapsible?: boolean // whether to show a button to expand/collapse the code
    code_above?: boolean // whether to show the code above the example, default is below
    id?: string // id of the <div> wrapping the code and example (e.g. for testing selectors)
    repl?: string // Svelte REPL URL
    github?: string | boolean // GitHub URL or true to link to the file serving the current page
    stackblitz?: string | boolean // StackBlitz URL or true to link to the file serving the current page
  } = {}
  export let open = !meta.collapsible

  let node: HTMLElement // the <code> element
  $: ({ repl, github, stackblitz } = meta)

  onMount(() => {
    // replace $lib with package name in code
    node.innerHTML = node.innerHTML?.replaceAll(`$lib`, name)
  })
</script>

{#if meta.collapsible}
  <nav>
    <slot name="title" />
    <button on:click={() => (open = !open)}>
      <Icon icon={open ? `collapse` : `expand`} />
      {open ? `Close` : `View code`}
    </button>
    <CodeLinks {repl} {github} {stackblitz} />
  </nav>
{/if}
<!-- wrap in div with id for precise CSS selectors in playwright E2E tests -->
<div id={meta.id}>
  {#if !meta.code_above}
    <slot name="example" />
  {/if}

  <details class:open>
    <aside>
      <CopyButton content={node?.innerText ?? src} />
      {#if !meta.collapsible}
        <CodeLinks {repl} {github} {stackblitz} />
      {/if}
    </aside>
    <pre><code bind:this={node}><slot name="code" /></code></pre>
  </details>

  {#if meta.code_above}
    <slot name="example" />
  {/if}
</div>

<style>
  details {
    position: relative;
    visibility: hidden;
    opacity: 0;
    max-height: 0;
    transition: max-height 0.3s, opacity 0.3s, visibility 0.3s;
  }
  details.open {
    visibility: visible;
    opacity: 1;
    max-height: 9999vh;
    margin-top: 2em;
  }
  aside {
    position: absolute;
    top: 1em;
    right: 1em;
    display: flex;
    gap: 1ex;
  }
  nav {
    display: flex;
    gap: 1ex;
    justify-content: end;
    margin-top: 1em;
  }
</style>
