const reactAppRewirePostcss = require('react-app-rewire-postcss');
const postcssThemeUi = require('postcss-theme-ui');

module.exports = config => reactAppRewirePostcss(config, {
  plugins: () => [
    postcssThemeUi({
			colors: {
				bg: '#282c34',
				text: 'white',
				primary: '#61dafb',
				blue: ['#3d899d', '#537182']
			},
			radii: [0, 3, 5, 9999, '100%']
		})
  ]
});
