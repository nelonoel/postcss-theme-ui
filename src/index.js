import postcss from "postcss";
import get from "lodash/get";
import valueParser from "postcss-value-parser";

import defaults from "./defaults";
import mapping from "./mapping";

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
			return;
		}

		decl.value = valueParser(decl.value)
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

	const convertThemeValues = decl => {
		decl.value = valueParser(decl.value)
			.walk(node => {
				if (
					node.type === "function" &&
					(node.value === "theme" || node.value === "th")
				) {
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
				checkPropMapping(decl);
				convertThemeValues(decl);
			});
		});
	};
});
