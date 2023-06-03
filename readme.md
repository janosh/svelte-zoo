<h1 align="center">
  <img src="https://raw.githubusercontent.com/janosh/svelte-zoo/main/static/favicon.svg" alt="Octocat" height=60>
  <br>&ensp;Svelte Zoo
</h1>

<h4 align="center">

[![Tests](https://github.com/janosh/svelte-zoo/actions/workflows/test.yml/badge.svg)](https://github.com/janosh/svelte-zoo/actions/workflows/test.yml)
[![GitHub Pages](https://github.com/janosh/svelte-zoo/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/janosh/svelte-zoo/actions/workflows/gh-pages.yml)
[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/janosh/svelte-zoo/main.svg)](https://results.pre-commit.ci/latest/github/janosh/svelte-zoo/main)
[![NPM version](https://img.shields.io/npm/v/svelte-zoo?color=blue&logo=NPM)](https://npmjs.com/package/svelte-zoo)

</h4>

Random assortment of Svelte components for building doc sites.

<strong class="hide-in-docs">

[Live demo](https://janosh.github.io/svelte-zoo)
</strong>

## 🔨 &thinsp; Installation

```sh
npm install --dev svelte-zoo
```

## 📙 &thinsp; Usage

More docs to come...

```svelte
<script>
  import {
    CircleSpinner, // animated rotating circle to indicate content is loading
    CodeExample, // to be used with mdsvexamples, syntax-highlights Svelte code and renders it
    CodeLinks, // link code fences to Svelte REPL, GitHub or StackBlitz for interactive sandboxing
    Confetti, // let confetti emoji rain across the screen to playfully show some event was triggered
    CopyButton, // add to code fences to allow copying its contents
    FileDetails, // use HTML <details> to show/hide file contents
    GitHubCorner, // place an animated GitHub icon linking to your repo in the screen corner
    Icon, // used by the other components to render the occasional icon but can also be imported for outside use
    PrevNext, // links to previous and next posts/pages/items in a list
    RadioButtons, // horizontally arranged group of buttons where selecting one auto-deselects the previous one
    Toggle, // boolean control
    Tooltip, // box to show extra info on hovering any DOM element
  } from 'svelte-zoo'
</script>
```

<slot name="nav" />
