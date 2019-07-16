import { decl as createDeclaration, parse, list } from "postcss";
import get from "lodash/get";
import getValue from "./value";

const createMediaQuery = minWidth => {
	const mq = parse(`\n@media screen and (min-width: ${minWidth}) {\n}`).first;
	return mq;
};

const createSelector = selector => {
	const decl = parse(`\n\t${selector} {\n\t}`).first;
	decl.raws["semicolon"] = true;
	return decl;
};

const getResponsiveValue = (decl, rule, mqs, theme) => {
	const [start, end] = [decl.value.indexOf("["), decl.value.indexOf("]")];

	if (start < 0) {
		return false;
	}

	const values = list.comma(decl.value.substring(start + 1, end));
	const defaultValue = getValue(values[0], theme, decl.prop);

	values.slice(1).map((v, i) => {
		if (!mqs[i]) {
			mqs[i] = createMediaQuery(get(theme, `breakpoints.${i}`));
			mqs[i].nodes.push(createSelector(rule.selector));
		}
		mqs[i].nodes[0].append(
			createDeclaration({
				prop: decl.prop,
				value: getValue(v, decl.prop, theme)
			})
		);
	});

	return defaultValue;
};

export default getResponsiveValue;
