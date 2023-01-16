```svelte example
<script>
  import { CodeExample } from '$lib'
  import { repository, name } from '$root/package.json'

  const meta = {
    collapsible: true,
    pkg: name,
    id: `uniq-id`,
  }
</script>

<CodeExample {meta} src="<button>some button</button>">
  <button slot="example">some button</button>
</CodeExample>
```

Use CSS selector `div.code-example` to apply global styles to your code examples.
