```svelte example
<script>
  // this is the actual example, above is just its output
  import { CodeExample } from '$lib'
  import { repository as repo, name } from '$root/package.json'

  const meta = {
    pkg: name,
    id: `uniq-id`,
    repo,
    stackblitz: true,
    github: true,
  }
</script>

<CodeExample {meta} src="<button>some button</button>">
  <button slot="example">some button</button>
</CodeExample>
```

Use CSS selector `div.code-example` to apply global styles to your code examples.

The DOM structure of this component is a bit ugly but here you go. Might help write CSS selectors.

```html
{#if collapsible}
<nav>
  <slot name="title" />
  <button on:click="{toggle_open}" />
  <CodeLinks {github} {repl} {stackblitz} {file} />
</nav>
{/if}

<div {id} class="code-example">
  {#if !code_above}
  <slot name="example" />
  {/if}

  <section class:open>
    <aside>
      <CopyButton content="{node?.innerText" ?? src} />
      {#if !collapsible}
      <CodeLinks {github} {repl} {stackblitz} {file} />
      {/if}
    </aside>
    <pre><code bind:this={node}><slot name="code">{src}</slot></code></pre>
  </section>

  {#if code_above}
  <slot name="example" />
  {/if}
</div>
```
