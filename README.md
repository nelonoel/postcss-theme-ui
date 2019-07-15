# PostCSS Theme UI [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[PostCSS Theme UI] lets you access Theme UI variables in your CSS.

```pcss
/* Given a theme object containing {
  colors: { text: '#111', primary: '#06c', error: '#c30' },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512]
} */

.example {
  color: primary;
  font-size: 6;
  margin: 0 auto -1;
  padding: 0 3 3px;
}

/* becomes */

.example {
  color: #06c;
  font-size: 48px;
  margin: 0 auto -4px;
  padding: 0 16px 3px;
}
```

## Usage

Add [PostCSS Theme UI] to your project:

```bash
npm install postcss-theme-ui --save-dev
```

Use **PostCSS Theme UI** to process your CSS:

```js
const postcssThemeUi = require("postcss-theme-ui");

postcssThemeUi.process(YOUR_CSS /*, processOptions, pluginOptions */);
```

Or use it as a [PostCSS] plugin:

```js
const postcss = require("postcss");
const postcssThemeUi = require("postcss-theme-ui");

postcss([postcssThemeUi(/* pluginOptions */)]).process(
  YOUR_CSS /*, processOptions */
);
```

**PostCSS Theme UI** runs in all Node environments, with special instructions for:

| [Node](INSTALL.md#node) | [PostCSS CLI](INSTALL.md#postcss-cli) | [Webpack](INSTALL.md#webpack) | [Create React App](INSTALL.md#create-react-app) | [Gulp](INSTALL.md#gulp) | [Grunt](INSTALL.md#grunt) |
| ----------------------- | ------------------------------------- | ----------------------------- | ----------------------------------------------- | ----------------------- | ------------------------- |


## Options

Accepts an object formatted based on [System UI Theme Specification](https://system-ui.com/theme/). See sample [theme object](test/theme.js).

## Todo

- [x] Retrieve value from theme object
- [x] Support negative space values
- [x] Custom theme fields via `theme()` CSS function.
- [ ] Resolve CSS shorthand properties, e.g: `font`, `background`, `border`, `grid`, etc.
- [ ] Responsive array properties (?)

[cli-img]: https://img.shields.io/travis/nelonoel/postcss-theme-ui/master.svg
[cli-url]: https://travis-ci.org/nelonoel/postcss-theme-ui
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/postcss-theme-ui.svg
[npm-url]: https://www.npmjs.com/package/postcss-theme-ui
[postcss]: https://github.com/postcss/postcss
[postcss theme ui]: https://github.com/nelonoel/postcss-theme-ui
