Getting a bit meta. Here's the `CodeExample.svelte` component documenting itself by rendering itself and syntax highlighting the code that calls it in a copyable code block.

### Non-collapsible example

```svelte example hideStyle
<script>
  // this is the actual example, above is just its output
  import { CodeExample } from '$lib'
  import { repository as repo, name } from '$root/package.json'

  let counter = 0
  const meta = {
    pkg: name,
    id: `uniq-id`,
    repo,
    stackblitz: true,
    github: true,
  }
</script>

<CodeExample
  {meta}
  src={`<p slot="example">
    <button on:click="{() => counter--}">-</button>
    {counter}
    <button on:click="{() => counter++}">+</button>
  </p>`}
  --zoo-example-code-top="5pt"
>
  <p slot="example">
    <button on:click={() => counter--}>-</button>
    {counter}
    <button on:click={() => counter++}>+</button>
  </p>
</CodeExample>

<CodeExample
  meta={{ ...meta, collapsible: true }}
  src={`<p slot="example">
    <button on:click="{() => counter--}">-</button>
    {counter}
    <button on:click="{() => counter++}">+</button>
  </p>`}
  --zoo-example-code-top="5pt"
>
  <p slot="example">
    <button on:click={() => counter--}>-</button>
    {counter}
    <button on:click={() => counter++}>+</button>
  </p>
</CodeExample>

<style>
  p {
    display: flex;
    align-items: center;
    gap: 1em;
  }
</style>
```

Use CSS selector `div.code-example` to apply global styles to your code examples. Example:

```css
div.code-example {
  padding: 1rem;
}
div.code-example pre {
  font-size: 1.2rem;
}
div.code-example section aside {
  background-color: tomato;
}
```

The DOM structure of this component is a bit ugly but here you go. Should help with writing CSS selectors.

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
