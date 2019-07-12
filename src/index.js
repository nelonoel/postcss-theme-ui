import postcss from "postcss";
import defaults from "./defaults";
import mapping from "./mapping";

import get from "lodash/get";

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

export default postcss.plugin("postcss-theme-ui", (options = {}) => {
	const theme = { ...defaults, ...options };

	convertIntToPx(
		theme.breakpoints,
		theme.fontSizes,
		theme.radii,
		theme.sizes,
		theme.space
	);
	addNegativeCounterpart(theme.space);

	const props = Object.keys(mapping);

	return css => {
		css.walkRules(rule => {
			rule.walkDecls(decl => {
				if (props.indexOf(decl.prop) > -1) {
					decl.value = decl.value
						.trim()
						.split(" ")
						.map(v => get(theme, `${mapping[decl.prop]}.${v}`, v))
						.join(" ");
				}
			});
		});
	};
});
