import valueParser from "postcss-value-parser";

const fnToStr = fn => {
	return `${fn.value}(${fn.nodes
		.filter(node => node.type === "word")
		.map(node => node.value)
		.join("")})`;
};

const parse = value => {
	const parser = valueParser(value);
	// console.log('\nBEFORE\n', parser.nodes) // eslint-disable-line

	let inArray = false;
	let nodes = [];
	let arrayNode = [];
	let val = "";

	parser.nodes.map(node => {
		const [start, end] = [node.value.indexOf("["), node.value.indexOf("]")];

		if (start >= 0) {
			inArray = true;
			val = node.value.substr(start + 1);
			if (val === "th" || val === "theme") {
				arrayNode.push(fnToStr({ ...node, value: val }));
			} else {
				arrayNode.push(val);
			}
			node.type = "array";
			node.value = arrayNode;
			nodes.push(node);
		} else if (end >= 0) {
			inArray = false;
			val = node.value.substr(0, end);
			// arrayNode.push({ ...node, value: val })
			val.length > 0 && arrayNode.push(val);
			arrayNode = [];
		} else if (inArray) {
			node.type === "word" && arrayNode.push(node.value);
			node.type === "function" && arrayNode.push(fnToStr(node));
		} else {
			nodes.push(node);
		}
	});

	// console.log('\nAFTER\n', nodes) // eslint-disable-line
	parser.nodes = nodes;
	return parser;
};

export default parse;
