import valueParser, { stringify } from "postcss-value-parser";

const parse = value => {
	const parser = valueParser(value);
	// console.log('\nBEFORE\n', parser.nodes) // eslint-disable-line

	let inArray = false;
	let parentNode = {};
	let nodes = [];
	let arrayNode = [];
	let item = [];
	let val = "";

	parser.nodes.map(node => {
		const [start, end] = [node.value.indexOf("["), node.value.indexOf("]")];

		if ((start >= 0) & (end >= 0)) {
			node.value = node.value.substring(start + 1, end);
			nodes.push(node);
			return;
		}

		if (start >= 0) {
			inArray = true;
			val = node.value.substring(start + 1);
			item.push({ ...node, value: val });
			parentNode = node;
			nodes.push(node);

			return;
		}

		if (end >= 0) {
			inArray = false;
			val = node.value.substring(0, end);
			val.length > 0 && item.push({ ...node, value: val });
			arrayNode.push(stringify(item));

			if (arrayNode.length > 1) {
				parentNode.type = "array";
				parentNode.value = arrayNode[0];
				parentNode.nodes = arrayNode.slice(1);
			}

			item = [];
			arrayNode = [];

			return;
		}

		if (inArray) {
			if (node.value === ",") {
				item.length > 0 && arrayNode.push(stringify(item));
				item = [];
			} else {
				item.push(node);
			}

			return;
		}

		nodes.push(node);
	});

	// console.log('\nAFTER\n', nodes) // eslint-disable-line
	parser.nodes = nodes;
	return parser;
};

export default parse;
