```svelte example
<script>
  import { CodeLinks } from '$lib'
  import { repository as repo } from '$root/package.json'

  const repl = `https://svelte.dev/repl`
</script>

<CodeLinks github stackblitz {repo} {repl} />
```

Use the `btn_text` prop to set custom button text:

```svelte example
<script>
  import { CodeLinks } from '$lib'
  import { repository } from '$root/package.json'

  const file = `src/lib/CodeLinks.svelte`
  const props = {
    repo: repository,
    github: true,
    repl: `https://svelte.dev/repl`,
    stackblitz: true,
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
