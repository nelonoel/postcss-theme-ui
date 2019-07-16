var theme = require("./test/theme.js");

module.exports = {
	basic: {
		message: "supports basic value retrieval",
		options: theme
	},
	"negative-values": {
		message: "supports negative values",
		options: theme
	},
	"theme-function": {
		message: "supports theme function",
		options: Object.assign(theme, {
			borderStyles: ["solid", "dashed"]
		})
	},
	"media-queries": {
		message: "supports media queries",
		options: theme
	},
	"shorthand-props": {
		message: "supports CSS shorthand props",
		options: theme
	},
	"array-as-props": {
		message: "supports array as props",
		options: theme
	},
	"theme-function-in-arrays": {
		message: "supports theme functions in arrays",
		options: Object.assign(theme, {
			borderStyles: ["solid", "dashed"]
		})
	}
};
