import postcss from "postcss";

import getTheme from "./lib/theme";
import getValue from "./lib/value";

export default postcss.plugin("postcss-theme-ui", (options = {}) => {
	const theme = getTheme(options);

	return css => {
		css.walkAtRules("media", rule => {
			rule.params = getValue({ rawValue: rule.params, theme });
		});

		css.walkRules(rule => {
			const mqs = [];
			rule.walkDecls(decl => {
				decl.value = getValue({
					mqs,
					theme,
					prop: decl.prop,
					rawValue: decl.value,
					selector: rule.selector
				});
			});
			rule.parent.append(mqs.filter(mq => mq.nodes[0].nodes.length > 0));
		});
	};
});
