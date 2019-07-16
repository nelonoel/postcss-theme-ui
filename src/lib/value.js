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
	// console.log('RAW VALUE', rawValue) // eslint-disable-line
	let value = parse(rawValue);
	// console.log('PARSED VALUE', value) //eslint-disable-line
	value = convertMappedProps({ value, ...args });
	// console.log('CONVERT MAPPED PROPS', value.toString()) //eslint-disable-line
	value = convertThemeFunction({ value, ...args });
	// console.log('CONVERT THEMES', value.toString()) //eslint-disable-line
	value = nested ? value : convertArrays({ value, ...args });

	return value.toString();
};

export default getValue;
