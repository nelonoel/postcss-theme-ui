# Installing PostCSS theme-ui

[PostCSS theme-ui] runs in all Node environments, with special instructions for:

| [Node](#node) | [PostCSS CLI](#postcss-cli) | [Webpack](#webpack) | [Create React App](#create-react-app) | [Gulp](#gulp) | [Grunt](#grunt) |
| --- | --- | --- | --- | --- | --- |

## Node

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

## PostCSS CLI

Add [PostCSS CLI] to your project:

```bash
npm install postcss-cli --save-dev
```

Use **PostCSS theme-ui** in your `postcss.config.js` configuration file:

```js
const postcssThemeUi = require('postcss-theme-ui');

module.exports = {
  plugins: [
    postcssThemeUi(/* pluginOptions */)
  ]
}
```

## Webpack

Add [PostCSS Loader] to your project:

```bash
npm install postcss-loader --save-dev
```

Use **PostCSS theme-ui** in your Webpack configuration:

```js
const postcssThemeUi = require('postcss-theme-ui');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader', options: {
            ident: 'postcss',
            plugins: () => [
              postcssThemeUi(/* pluginOptions */)
            ]
          } }
        ]
      }
    ]
  }
}
```

## Create React App

Add [React App Rewired] and [React App Rewire PostCSS] to your project:

```bash
npm install react-app-rewired react-app-rewire-postcss --save-dev
```

Use **React App Rewire PostCSS** and **PostCSS theme-ui** in your
`config-overrides.js` file:

```js
const reactAppRewirePostcss = require('react-app-rewire-postcss');
const postcssThemeUi = require('postcss-theme-ui');

module.exports = config => reactAppRewirePostcss(config, {
  plugins: () => [
    postcssThemeUi(theme)
  ]
});
```

Then replace `react-scripts` calls to `react-app-rewired` in your `package.json`:

```
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  }
```

## Gulp

Add [Gulp PostCSS] to your project:

```bash
npm install gulp-postcss --save-dev
```

Use **PostCSS theme-ui** in your Gulpfile:

```js
const postcss = require('gulp-postcss');
const postcssThemeUi = require('postcss-theme-ui');

gulp.task('css', () => gulp.src('./src/*.css').pipe(
  postcss([
    postcssThemeUi(/* pluginOptions */)
  ])
).pipe(
  gulp.dest('.')
));
```

## Grunt

Add [Grunt PostCSS] to your project:

```bash
npm install grunt-postcss --save-dev
```

Use **PostCSS theme-ui** in your Gruntfile:

```js
const postcssThemeUi = require('postcss-theme-ui');

grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
  postcss: {
    options: {
      use: [
       postcssThemeUi(/* pluginOptions */)
      ]
    },
    dist: {
      src: '*.css'
    }
  }
});
```

[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[PostCSS CLI]: https://github.com/postcss/postcss-cli
[PostCSS Loader]: https://github.com/postcss/postcss-loader
[PostCSS theme-ui]: https://github.com/nelonoel/postcss-theme-ui
[React App Rewire PostCSS]: https://github.com/csstools/react-app-rewire-postcss
[React App Rewired]: https://github.com/timarney/react-app-rewired
