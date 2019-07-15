import postcss from "postcss";
import get from "lodash/get";
import valueParser from "postcss-value-parser";

import defaults from "./defaults";
import mapping from "./mapping";

const isThemeFunction = node =>
	node.type === "function" && (node.value === "theme" || node.value === "th");

const normalizeTheme = theme => {
	const convertIntToPx = (...args) => {
		args.forEach(scale => {
			for (let [k, v] of Object.entries(scale)) {
				if (Number.isInteger(v) && v !== 0) {
					scale[k] = `${v}px`;
				}
			}
		});
	};

	const addNegativeCounterpart = (...args) => {
		args.forEach(scale => {
			for (let [k, v] of Object.entries(scale)) {
				k = parseInt(k);
				if (Number.isInteger(k) && k > 0) {
					scale[-k] = `-${v}`;
				}
			}
		});
	};

	convertIntToPx(
		theme.breakpoints,
		theme.fontSizes,
		theme.radii,
		theme.sizes,
		theme.space
	);

	addNegativeCounterpart(theme.space);

	return theme;
};

export default postcss.plugin("postcss-theme-ui", (options = {}) => {
	const theme = normalizeTheme({ ...defaults, ...options });
	const props = Object.keys(mapping);

	const checkPropMapping = decl => {
		if (props.indexOf(decl.prop) < 0) {
			return decl.value;
		}

		return valueParser(decl.value)
			.walk(node => {
				if (node.type === "word") {
					node.value = get(
						theme,
						`${mapping[decl.prop]}.${node.value}`,
						node.value
					);
				}
			})
			.toString();
	};

	const convertThemeValues = value => {
		return valueParser(value)
			.walk(node => {
				if (isThemeFunction(node)) {
					node.type = "word";
					node.value = node.nodes
						.filter(arg => arg.type === "word")
						.map(arg => get(theme, arg.value, arg.value))[0];
				}
			})
			.toString();
	};

	return css => {
		css.walkRules(rule => {
			rule.walkDecls(decl => {
				decl.value = checkPropMapping(decl);
				decl.value = convertThemeValues(decl.value);
			});
		});

		css.walkAtRules("media", rule => {
			rule.params = convertThemeValues(rule.params);
		});
	};
});
