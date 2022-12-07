<h1 align="center">
  <img src="https://raw.githubusercontent.com/janosh/svelte-github-corner/main/static/favicon.svg" alt="Octocat" height=60>
  <br>&ensp;Svelte GitHub Corner
</h1>

<h4 align="center">

[![NPM version](https://img.shields.io/npm/v/svelte-github-corner?color=blue&logo=NPM)](https://npmjs.com/package/svelte-github-corner)
[![GitHub Pages](https://github.com/janosh/svelte-github-corner/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/janosh/svelte-github-corner/actions/workflows/gh-pages.yml)
[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/janosh/svelte-github-corner/main.svg)](https://results.pre-commit.ci/latest/github/janosh/svelte-github-corner/main)

</h4>

<strong class="hide-in-docs">

[Live demo](https://github-corner.janosh.dev)
</strong>

## Installation

```sh
npm install -D svelte-github-corner
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

- `href: string`: (required) The GitHub URL to link to.
- `title: string = 'View code on GitHub'`: Text to display in hover tooltip.
- `ariaLabel: string = title`: Accessible name for SVG button describing its function. [See MDN](https://developer.mozilla.org/docs/Web/Accessibility/ARIA/Attributes/aria-label). Should not be set to empty string.
- `target: '_self' | '_blank' = '_self'`: Whether to open `href` in same (`'_self'`) or new tab (`'_blank'`).
- `corner: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' = 'topRight'`: Which corner of the screen to position the Octocat. `'bottomLeft/Right'` look bad, shouldn't normally be used.
- `style: string = ''`: Inline styles that will be applied to the `<a>` tag.

## Styling

With CSS variables:

```css
fill: var(--ghc-bg, black);
color: var(--ghc-color, white);
width: var(--ghc-size, min(50pt, 15vw));
```

Can be passed as props or set in a global stylesheet.
