<script lang="ts">
  import { SvelteComponent } from 'svelte'

  interface Props {
    component: typeof SvelteComponent
    options: []
    selected?: string | number | null
    [key: string]: unknown
    onselected: (selected: string | number | null) => void
  }

  let {
    Component,
    options,
    selected = $bindable(null),
    onselected,
    ...rest
  }: Props = $props()

  $effect(() => onselected?.(selected))
</script>

<Component {options} bind:selected {...rest} />
