```svelte example
<script lang="ts">
  import { GitHubCorner } from '$lib'
  const href = 'https://github.com/janosh/svelte-zoo'
</script>

<!-- minimal -->
<GitHubCorner {href} />

<!-- kitchen sink -->
<GitHubCorner
  {href}
  title="Fancy words"
  ariaLabel="Click here for riches"
  target="_blank"
  corner="top-left"
  style="z-index: 42;"
  --zoo-github-corner-bg="pink"
  --zoo-github-corner-color="var(--page-bg)"
/>

<GitHubCorner {href} corner="bottom-left" fill="orange" />

<GitHubCorner {href} corner="bottom-right" color="cornflowerblue" />
```

## 🔣 &thinsp; Props

- `href: string`: (required) The GitHub URL to link to.
- `title: string = 'View code on GitHub'`: Text to display in hover tooltip.
- `ariaLabel: string = title`: Accessible name for SVG button describing its function. [See MDN](https://developer.mozilla.org/docs/Web/Accessibility/ARIA/Attributes/aria-label). Should not be set to the empty string.
- `target: '_self' | '_blank' = '_self'`: Whether to open `href` in same (`'_self'`) or new tab (`'_blank'`).
- `corner: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'top-right'`: Which corner of the screen to position the Octocat. `'bottom-(left|right)'` look bad, shouldn't normally be used.
- `style: string = ''`: Inline styles that will be applied to the `<a>` tag.

## ✨ &thinsp; Styling

With CSS variables:

```css
fill: var(--zoo-github-corner-bg, black);
color: var(--zoo-github-corner-color, white);
width: var(--zoo-github-corner-size, min(50pt, 15vw));
```

Can be passed as props or set in a global stylesheet.
