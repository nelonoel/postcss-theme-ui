import postcss from "postcss";
import defaults from "./defaults";
import mapping from "./mapping";

import get from "lodash/get";

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
		if (props.indexOf(decl.prop) > -1) {
			decl.value = decl.value
				.trim()
				.split(" ")
				.map(v => get(theme, `${mapping[decl.prop]}.${v}`, v))
				.join(" ");
		}
	};

	const convertThemeValues = decl => {
		decl.value = decl.value
			.trim()
			.split(" ")
			.map(v => {
				const themeNotation = "theme(";
				const [start, end] = [v.indexOf(themeNotation), v.indexOf(")")];
				if (start > -1) {
					return get(
						theme,
						`${v.substring(start + themeNotation.length, end)}`,
						v
					);
				}
				return v;
			})
			.join(" ");
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
