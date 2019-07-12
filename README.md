# PostCSS theme-ui [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[PostCSS theme-ui] lets you access Theme UI variables in your CSS.

```pcss
/* Given a theme object containing {
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512]
} */

.example {
  font-size: 6;
  margin: 0 auto;
  padding: 0 3 3px;
}

/* becomes */

.example { 
  font-size: 48px;
  margin: 0 auto;
  padding: 0 16px 3px;
}
```

## Usage

Add [PostCSS theme-ui] to your project:

```bash
npm install postcss-theme-ui --save-dev
```

Use **PostCSS theme-ui** to process your CSS:

```js
const postcssThemeUi = require('postcss-theme-ui');

postcssThemeUi.process(YOUR_CSS /*, processOptions, pluginOptions */);
```

Or use it as a [PostCSS] plugin:

```js
const postcss = require('postcss');
const postcssThemeUi = require('postcss-theme-ui');

postcss([
  postcssThemeUi(/* pluginOptions */)
]).process(YOUR_CSS /*, processOptions */);
```

**PostCSS theme-ui** runs in all Node environments, with special instructions for:

| [Node](INSTALL.md#node) | [PostCSS CLI](INSTALL.md#postcss-cli) | [Webpack](INSTALL.md#webpack) | [Create React App](INSTALL.md#create-react-app) | [Gulp](INSTALL.md#gulp) | [Grunt](INSTALL.md#grunt) |
| --- | --- | --- | --- | --- | --- |

## Options
Accepts a `theme` object formatted based on [System UI Theme Specification](https://system-ui.com/theme/).

## Todo
 - [x] Retrieve value from theme object
 - [x] Support negative space values
 - [ ] Resolve CSS shorthand properties, e.g: `font`, `background`, `border`, `grid`, etc.
 - [ ] Responsive array properties (?)

[cli-img]: https://img.shields.io/travis/nelonoel/postcss-theme-ui/master.svg
[cli-url]: https://travis-ci.org/nelonoel/postcss-theme-ui
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/postcss-theme-ui.svg
[npm-url]: https://www.npmjs.com/package/postcss-theme-ui

[PostCSS]: https://github.com/postcss/postcss
[PostCSS theme-ui]: https://github.com/nelonoel/postcss-theme-ui
