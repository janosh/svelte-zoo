<script lang="ts">
  // see svelte.config.js where this component is passed to mdsvexamples
  import { CodeLinks, CopyButton, Icon } from '$lib'

  // src+meta are passed in by mdsvexamples
  export let src: string = `` // code fence content, sadly without indentation so we prefer node?.innerText below
  export let meta: {
    // code fence metadata
    collapsible?: boolean // whether to show a button to expand/collapse the code
    code_above?: boolean // whether to show the code above the example, default is below
    id?: string // id of the <div> wrapping the code and example (e.g. to write very specific testing selectors)
    repl?: string // Svelte REPL URL
    github?: string | boolean // GitHub URL or true to link to the file serving the current page
    stackblitz?: string | boolean // StackBlitz URL or true to link to the file serving the current page
    repo?: string // GitHub repo URL
    pkg?: string // package name will replace $lib in code
    Wrapper?: string // Svelte component to wrap the example
    example?: boolean
    file?: string
  } = {}
  export let open: boolean = !meta.collapsible

  let node: HTMLElement // the <code> element
  $: ({ id, collapsible, code_above, pkg } = meta)

  $: if (pkg && node) {
    // replace $lib with package name in code
    node.innerHTML = node.innerHTML?.replaceAll(`$lib`, pkg)
  }
</script>

{#if collapsible}
  <nav>
    <slot name="title" />
    <button on:click={() => (open = !open)}>
      <Icon icon={open ? `Collapse` : `Expand`} />
      {open ? `Close` : `View code`}
    </button>
    <CodeLinks github={meta.github} stackblitz={meta.stackblitz} repo={meta.repo} />
  </nav>
{/if}
<!-- wrap in div with id for precise CSS selectors in playwright E2E tests -->
<div {id} class="code-example">
  {#if !code_above}
    <slot name="example" />
  {/if}

  <pre class:open><code bind:this={node}><slot name="code">{src}</slot></code><aside>
      <CopyButton content={node?.innerText ?? src} />
      {#if !collapsible}
        <CodeLinks github={meta.github} stackblitz={meta.stackblitz} repo={meta.repo} />
      {/if}
    </aside></pre>
  <slot name="after-code" />

  {#if code_above}
    <slot name="example" />
  {/if}
</div>

<style>
  div.code-example {
    margin: var(--zoo-example-margin, 2em auto);
  }
  aside {
    position: absolute;
    display: flex;
    gap: 5pt;
    top: var(--zoo-example-code-top, 1em);
    right: var(--zoo-example-code-right, 1em);
    bottom: var(--zoo-example-code-bottom);
    left: var(--zoo-example-code-left);
  }
  nav {
    display: flex;
    justify-content: end;
    margin-top: var(--zoo-example-nav-margin-top, 1em);
    gap: var(--zoo-example-nav-gap, 1ex);
  }
  pre code {
    background-color: transparent;
    display: inline-block;
  }
  pre {
    position: relative;
    overflow-x: auto;
    visibility: hidden;
    opacity: 0;
    max-height: 0;
    transition: max-height, opacity, visibility;
    transition-duration: var(--zoo-example-code-transition-duration, 0.3s);
    border-radius: var(--zoo-example-code-border-radius, 4pt);
    background-color: var(--zoo-example-code-bg, rgba(255, 255, 255, 0.05));
    padding: var(--zoo-example-code-padding, 1em);
  }
  pre.open {
    visibility: visible;
    opacity: 1;
    max-height: 9999vh;
    margin: var(--zoo-example-code-margin, 1em 0 0 0);
  }

  :global(div.code-example :is(button, a.btn)) {
    color: white;
    cursor: pointer;
    border: none;
    border-radius: 3pt;
    padding: 2pt 4pt;
    font-size: 12pt;
    line-height: initial;
    transition: background-color 0.2s;
    background-color: var(--zoo-example-btn-bg, darkcyan);
  }
  :global(div.code-example :is(button, a.btn)):hover {
    background-color: var(--zoo-example-btn-bg-hover, teal);
  }
</style>
