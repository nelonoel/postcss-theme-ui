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
	"shorthand-props": {
		message: "supports CSS shorthand props",
		options: theme
	},
	"array-as-props": {
		message: "supports array as props",
		options: theme
	}
};
