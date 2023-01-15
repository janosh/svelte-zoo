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

Use the `btn_text` prop to set custom button text:

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
    btn_text: {
      github: 'GitHub',
      stackblitz: 'StackBlitz',
      repl: 'REPL',
    },
  }
</script>

<CodeLinks {...props} />
```
