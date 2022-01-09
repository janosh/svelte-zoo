<h1 align="center">Svelte GitHub Corner</h1>

<h4 align="center">

[![NPM version](https://img.shields.io/npm/v/svelte-github-corner?color=blue&logo=NPM)](https://npmjs.com/package/svelte-github-corner)
[![Netlify Status](https://api.netlify.com/api/v1/badges/c3213069-e3cc-45ef-a446-b2358b9a35fb/deploy-status)](https://app.netlify.com/sites/svelte-github-corner/deploys)
[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/janosh/svelte-github-corner/main.svg)](https://results.pre-commit.ci/latest/github/janosh/svelte-github-corner/main)

</h4>

<div class="hide-in-demo">

**[Live demo](https://svelte-github-corner.netlify.app)**

</div>

## Installation

```sh
yarn add -D svelte-github-corner
```

## Usage

```svelte
<script>
  import GitHubCorner from 'svelte-github-corner'
</script>

<!-- minimal -->
<GitHubCorner href="https://github.com/janosh/svelte-github-corner" />

<!-- kitchen sink -->
<GitHubCorner
  href="https://github.com/janosh/svelte-github-corner"
  title="My eloquent title"
  ariaLabel="Click here for riches"
  target="_blank"
  corner="topLeft"
  style="z-index: 42;"
  --ghc-bg="white"
  --ghc-color="var(--bodyBg)"
/>
```

## Props

`GitHubCorner.svelte` accepts the following props

- `href: string`: (required) The GitHub URL to link to.
- `title: string = 'View code on GitHub'`: Text to display in hover tooltip.
- `ariaLabel: string = title`: Accessible name for SVG button describing its function. [See MDN](https://developer.mozilla.org/docs/Web/Accessibility/ARIA/Attributes/aria-label). Should not be set to empty string.
- `target: '_self' | '_blank' = '_self'`: Whether to open `href` in same (`'_self'`) or new tab (`'_blank'`).
- `corner: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' = 'topRight'`: Which corner of the screen to position the Octocat. `'bottomLeft/Right'` look bad, shouldn't normally be used.
- `style: string = ''`: Inline styles that will be applied to the `<a>` tag.

## Styling

`GitHubCorner.svelte` exposes the following CSS variables:

```css
a {
  fill: var(--ghc-bg, black);
  color: var(--ghc-color, white);
  width: var(--ghc-size, min(50pt, 15vw));
}
```
