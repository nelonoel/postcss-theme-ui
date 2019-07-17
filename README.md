[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[PostCSS Theme UI] lets you access Theme UI variables in your CSS.

## Table of Contents

- [Setup](#setup)
- [Plugin Options](#options)
- [Overview](#overview)
- [Responsive Values](#responsive-values)
- [Custom Design Tokens](#custom-design-tokens)
- [Caveats](#caveats)

## Setup

Add [PostCSS Theme UI] to your project:

```bash
npm install postcss-theme-ui --save-dev
```

Use **PostCSS Theme UI** to process your CSS:

```js
const postcssThemeUI = require("postcss-theme-ui");

postcssThemeUI.process(YOUR_CSS /*, processOptions, theme */);
```

Or use it as a [PostCSS] plugin:

```js
const postcss = require("postcss");
const postcssThemeUI = require("postcss-theme-ui");
const theme = require("./theme");

postcss([postcssThemeUI(theme)]).process(YOUR_CSS /*, processOptions */);
```

**PostCSS Theme UI** runs in all Node environments, with special instructions for:

| [Node](INSTALL.md#node) | [PostCSS CLI](INSTALL.md#postcss-cli) | [Webpack](INSTALL.md#webpack) | [Create React App](INSTALL.md#create-react-app) | [Gulp](INSTALL.md#gulp) | [Grunt](INSTALL.md#grunt) |
| ----------------------- | ------------------------------------- | ----------------------------- | ----------------------------------------------- | ----------------------- | ------------------------- |


## Options

PostCSS Theme UI accepts an object formatted based on the [System UI Theme Specification](https://system-ui.com/theme/). See sample [theme object](test/theme.js).

## Overview

Given the following theme config:

```js
{
  breakpoints: ["40em", "52em", "64em"],
  colors: { text: '#111', primary: '#06c', error: '#c30' },
	fonts: {
		sans: '"IBM Plex Sans", sans-serif',
		serif: '"IBM Plex Serif", serif'
	},
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  sizes: ["initial", "48rem", "64rem"],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512]
}
```

[PostCSS Theme UI] maps CSS properties to the appropriate theme field. You can view the full prop mapping [here](src/mapping.js). It supports negative values (_for certain properties_) and conversion of unitless integers to `px`.

```css
.example {
  color: primary; /* colors.primary */
  font-size: 6; /* fontSizes[6] */
  margin: 0 auto -1; /* space[0] auto -space[1] */
  padding: 0 3 3px; /* space[0] space[3] 3px */
}

/* becomes */

.example {
  color: #06c;
  font-size: 48px;
  margin: 0 auto -4px;
  padding: 0 16px 3px;
}
```

## Responsive Values

It also provides support for _array values_ that map to your breakpoints for convenient responsive styling.

```css
.card {
  color: primary; /* colors.primary */
  max-width: [0, 1, 2]; /* [sizes] */
  padding: [1, 2]; /* [space] */
}

/* becomes */

.card {
  color: #07c;
  max-width: initial;
  padding: 4px;
}
@media screen and (min-width: 40em) {
  .card {
    max-width: 48rem;
    padding: 8px;
  }
}
@media screen and (min-width: 52em) {
  .card {
    max-width: 64rem;
  }
}
```

## Custom Design Tokens

If you have design tokens currently not on the Theme UI spec, you can access them via the `theme()` or `th()` function.

Say, you want to add a `gradients` field to your tokens:

```js
// theme config
{
  gradients: [
    "linear-gradient(to right, #DD2476, #FF512F)",
    "linear-gradient(to right, #FFF, #6DD5FA, #2980B9)"
  ];
}
```

Use them by calling the `theme()` or `th()` CSS functions.

```css
.awesome-cta {
  background: th(gradients.0);
}

/* becomes */

.awesome-cta {
  background: linear-gradient(to right, #dd2476, #ff512f);
}
```

**Note:** Since we're using PostCSS, we can conveniently plug [autoprefixer] in our toolchain as well.

## Caveats

1. Short hand CSS properties such as `font`, `background`, and `border` will only map to one theme field as defined [here](src/mapping.js). However, You can still access theme variables via the `theme` function.

```css
.btn {
  border: theme(colors.primary) 1; /* colors.primary borders[1] */
  font: sans theme(fontSizes.1); /* fonts.sans fontSizes[1] */
}

/* becomes */

.btn {
  border: #07c solid 1px;
  font: "IBM Plex Sans", sans-serif 1rem;
}
```

2. [Responsive Values](#responsive-values) cannot be nested and can only be balanced when used more than once per property. For example, the following won't work at the moment. 😉

```
.impossible {
  margin: [0, 1] [0, 1, 2];
  padding: [0, [1, 2]];
}
```

3. Editor syntax highlighting is still a work in progress.

[cli-img]: https://img.shields.io/travis/nelonoel/postcss-theme-ui/master.svg
[cli-url]: https://travis-ci.org/nelonoel/postcss-theme-ui
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/postcss-theme-ui.svg
[npm-url]: https://www.npmjs.com/package/postcss-theme-ui
[postcss]: https://github.com/postcss/postcss
[postcss theme ui]: https://github.com/nelonoel/postcss-theme-ui
[autoprefixer]: https://github.com/postcss/autoprefixer
