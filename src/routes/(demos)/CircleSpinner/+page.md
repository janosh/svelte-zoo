```svelte example
<script>
  import { CircleSpinner } from '$lib'
</script>

<CircleSpinner />
```

If not passing `color` prop explicitly, defaults to current text color:

```svelte example
<script>
  import { CircleSpinner } from '$lib'
</script>

<div style="color: red;">
  <CircleSpinner />
</div>
```
