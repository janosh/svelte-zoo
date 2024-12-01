## All `svelte-zoo` Components

```svelte example
<script>
  import { FileDetails } from '$lib'

  const files = Object.entries(
    import.meta.glob('/src/lib/*.svelte', { eager: true, query: '?raw', import: 'default' })
  ).map(([path, file]) => ({
    path,
    title: path.split('/').pop(),
    content: file,
  }))
</script>

<FileDetails {files} />
```
