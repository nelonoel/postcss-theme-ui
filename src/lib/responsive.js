import { decl as createDeclaration, parse } from "postcss";
import get from "lodash/get";
import cloneDeep from "lodash/cloneDeep";
import getValue from "./value";

const isArray = node => node.type === "array";

const createMediaQuery = minWidth => {
	const mq = parse(`\n@media screen and (min-width: ${minWidth}) {\n}`).first;
	return mq;
};

const createSelector = selector => {
	const decl = parse(`\n\t${selector} {\n\t}`).first;
	decl.raws["semicolon"] = true;
	return decl;
};

const createMediaQueries = ({ value, mqs, prop, selector, theme }) => {
	const props = {};
	value.nodes.map(node => {
		if (isArray(node)) {
			node.value = node.value.slice(1);
			node.value.map((v, i) => {
				if (!mqs[i]) {
					mqs[i] = createMediaQuery(get(theme, `breakpoints.${i}`));
					mqs[i].nodes.push(createSelector(selector));
				}
				if (!props[prop]) {
					props[prop] = [];
				}
				props[prop][i] = createDeclaration({
					prop,
					value: cloneDeep(value)
						.walk(n => {
							if (isArray(n)) {
								n.value = getValue({
									rawValue: n.value[i],
									nested: true,
									prop,
									theme
								});
							}
						})
						.toString()
				});
			});
		}
	});

	Object.keys(props).map(p => {
		props[p].map((decl, i) => {
			mqs[i].nodes[0].append(decl);
		});
	});
};

const convertArrays = ({ value, ...args }) => {
	createMediaQueries({ value: cloneDeep(value), ...args });

	value.walk(node => {
		if (isArray(node)) {
			node.type = "word";
			node.value = getValue({ rawValue: node.value[0], nested: true, ...args });
		}
	});

	return value;
};

export default convertArrays;
