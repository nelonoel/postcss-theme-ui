import postcss, { decl as newDecl, parse, list } from "postcss";
import get from "lodash/get";
import valueParser from "postcss-value-parser";

import defaults from "./defaults";
import mapping from "./mapping";

const isThemeFunction = node =>
	node.type === "function" && (node.value === "theme" || node.value === "th");

const createMediaQuery = minWidth => {
	// const mq = newAtRule({
	// 	name: "media",
	// 	params: `screen and (min-width: ${minWidth})`
	// });
	const mq = parse(`\n@media screen and (min-width: ${minWidth}) {\n}`).first;
	// mq["nodes"] = [];
	return mq;
};

const createSelector = selector => {
	const decl = parse(`\n\t${selector} {\n\t}`).first;
	decl.raws["semicolon"] = true;
	return decl;
};

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

	const checkPropMapping = (prop, value) => {
		if (props.indexOf(prop) < 0) {
			return value;
		}

		return valueParser(value)
			.walk(node => {
				if (node.type === "word") {
					node.value = get(theme, `${mapping[prop]}.${node.value}`, node.value);
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

	const processArrayValues = (decl, rule, mqs) => {
		const [start, end] = [decl.value.indexOf("["), decl.value.indexOf("]")];
		if (start < 0) {
			return false;
		}

		const values = list.comma(decl.value.substring(start + 1, end));
		const defaultValue = convertThemeValues(
			checkPropMapping(decl.prop, values[0])
		);

		values.slice(1).map((th, i) => {
			if (!mqs[i]) {
				mqs[i] = createMediaQuery(get(theme, `breakpoints.${i}`));
				mqs[i].nodes.push(createSelector(rule.selector));
			}

			let value = checkPropMapping(decl.prop, th);
			value = convertThemeValues(th);

			value = newDecl({ prop: decl.prop, value: value });
			mqs[i].nodes[0].append(value);
		});

		return defaultValue;
	};

	return css => {
		css.walkRules(rule => {
			const mqs = [];

			rule.walkDecls(decl => {
				const val = processArrayValues(decl, rule, mqs);
				if (val) {
					decl.value = val;
					return;
				}
				decl.value = checkPropMapping(decl.prop, decl.value);
				decl.value = convertThemeValues(decl.value);
			});

			if (mqs.length > 0) {
				rule.parent.append(mqs);
			}
		});

		css.walkAtRules("media", rule => {
			rule.params = convertThemeValues(rule.params);
		});
	};
});
