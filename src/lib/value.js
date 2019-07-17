import get from "lodash/get";

import convertArrays from "./responsive";
import parse from "./parse";
import mapping from "../mapping";
const props = Object.keys(mapping);

const isThemeFunction = node =>
	node.type === "function" && (node.value === "theme" || node.value === "th");

const convertMappedProps = ({ value, theme, prop }) => {
	if (prop && props.indexOf(prop) < 0) {
		return value;
	}

	return value.walk(node => {
		if (node.type === "word") {
			node.value = get(theme, `${mapping[prop]}.${node.value}`, node.value);
		}
	});
};

const convertThemeFunction = ({ value, theme }) => {
	return value.walk(node => {
		if (isThemeFunction(node)) {
			node.type = "word";
			node.value = node.nodes
				.filter(n => n.type === "word")
				.map(n => get(theme, n.value, n.value))[0];
		}
	});
};

const getValue = ({ rawValue, nested, ...args }) => {
	let value = parse(rawValue);
	value = convertMappedProps({ value, ...args });
	value = convertThemeFunction({ value, ...args });
	value = nested ? value : convertArrays({ value, ...args });

	return value.toString();
};

export default getValue;
