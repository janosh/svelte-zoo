<script lang="ts">
  import hljs from 'highlight.js/lib/common'
  import 'highlight.js/styles/vs2015.css'

  export let files: {
    title: string
    content: string
    language?: string
    node?: HTMLDetailsElement | null
  }[] = []
  export let toggle_all_btn_title: string = 'Toggle all'
  export let default_lang: string = 'typescript'

  function toggle_all() {
    const any_open = files.some((file) => file.node?.open)
    for (const file of files) {
      if (!file.node) continue
      file.node.open = !any_open
    }
    files = [...files] // trigger reactivity
  }
</script>

{#if files?.length > 1}
  <button on:click={toggle_all} title={toggle_all_btn_title}>
    {files.some((file) => file.node?.open) ? 'Close' : 'Open'} all
  </button>
{/if}

<ol>
  {#each files as file, idx (file.title)}
    {@const { title, content, language = default_lang } = file}
    <li>
      <details bind:this={file.node}>
        <summary>
          <slot name="title" {idx} {...file}>
            <code>{title.split('/').at(-1)}</code>
          </slot>
        </summary>

        <pre><code>{@html hljs.highlight(content, { language }).value}</code></pre>
      </details>
    </li>
  {/each}
</ol>

<style>
  button {
    float: right;
  }
  ol {
    padding: 0 1em;
  }
  ol > li {
    margin: 1ex 0;
  }
</style>
