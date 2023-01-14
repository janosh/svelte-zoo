```svelte example
<script>
  import { CodeExample } from '$lib'
  import { repository, name } from '$root/package.json'

  const meta = {
    collapsible: true,
    pkg_name: name,
    id: `uniq-id`,
  }
</script>

<CodeExample {meta} />
```

Use CSS selector `div.code-example` to apply global styles to your code examples.
