```svelte example
<script>
  import { CodeLinks } from '$lib'
  import { repository } from '$root/package.json'

  const file = `src/lib/CodeLinks.svelte`
  const props = {
    repo: repository,
    github: file,
    repl: `https://svelte.dev/repl`,
    stackblitz: file,
    file,
  }
</script>

<CodeLinks {...props} />
```
