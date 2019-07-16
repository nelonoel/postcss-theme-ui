import postcss from "postcss";

import getTheme from "./lib/theme";
import getResponsiveValue from "./lib/responsive";
import getValue from "./lib/value";

export default postcss.plugin("postcss-theme-ui", (options = {}) => {
	const theme = getTheme(options);

	return css => {
		css.walkRules(rule => {
			const mqs = [];
			rule.walkDecls(decl => {
				decl.value =
					getResponsiveValue(decl, rule, mqs, theme) ||
					getValue(decl.value, theme, decl.prop);
			});
			rule.parent.append(mqs);
		});

		css.walkAtRules("media", rule => {
			rule.params = getValue(rule.params, theme);
		});
	};
});
