export { default as CircleSpinner } from './CircleSpinner.svelte'
export { default as CodeExample } from './CodeExample.svelte'
export { default as CodeLinks } from './CodeLinks.svelte'
export { default as Confetti } from './Confetti.svelte'
export { default as CopyButton } from './CopyButton.svelte'
export { default as GitHubCorner } from './GitHubCorner.svelte'
export { default as Icon } from './Icon.svelte'
export { default as RadioButtons } from './RadioButtons.svelte'
export { default as Slider } from './Slider.svelte'
export * from './stores'
export { default as Toggle } from './Toggle.svelte'
export { default as Tooltip } from './Tooltip.svelte'

export function get_bg_color(elem: HTMLElement | null): string {
  // recurse up the DOM tree to find the first non-transparent background color
  const transparent = `rgba(0, 0, 0, 0)`
  if (!elem) return `rgba(0, 0, 0, 0)`

  const bg = getComputedStyle(elem).backgroundColor
  if (bg && bg !== transparent) return bg
  return get_bg_color(elem.parentElement)
}
