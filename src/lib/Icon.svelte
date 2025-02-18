<script lang="ts">
  import * as icons from './icons'

  interface Props {
    icon: keyof typeof icons
    style?: string
    width?: string
    height?: string
  }

  let {
    icon,
    style = `display: inline-block; vertical-align: middle;`,
    width = `1em`,
    height = width,
  }: Props = $props()

  const SvelteComponent = $derived.by(() => {
    if (!(icon in icons)) console.error(`Icon '${icon}' not found`)
    return icons[icon]
  })
</script>

<SvelteComponent {style} {width} {height} />
