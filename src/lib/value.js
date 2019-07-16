import valueParser from "postcss-value-parser";
import get from "lodash/get";

import mapping from "../mapping";
const props = Object.keys(mapping);

const isThemeFunction = node =>
	node.type === "function" && (node.value === "theme" || node.value === "th");

const checkPropMapping = (value, theme, prop = null) => {
	if (prop && props.indexOf(prop) < 0) {
		return value;
	}

	return value.walk(node => {
		if (node.type === "word") {
			node.value = get(theme, `${mapping[prop]}.${node.value}`, node.value);
		}
	});
};

const convertThemeValues = (value, theme) => {
	return value.walk(node => {
		if (isThemeFunction(node)) {
			node.type = "word";
			node.value = node.nodes
				.filter(arg => arg.type === "word")
				.map(arg => get(theme, arg.value, arg.value))[0];
		}
	});
};

const getValue = (value, theme, prop) => {
	const parser = valueParser(value);
	return convertThemeValues(
		checkPropMapping(parser, theme, prop),
		theme
	).toString();
};

export default getValue;
