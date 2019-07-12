import postcss from 'postcss';
import defaults from './defaults';
import mapping from './mapping';

import get from 'lodash/get';

export default postcss.plugin('postcss-theme-ui', (options = {}) => {
	const theme = {...defaults, ...options}

	const props = Object.keys(mapping)

	return (css) => {
		css.walkRules(rule => {
			rule.walkDecls(decl => {
				if(props.indexOf(decl.prop) > -1) {
					const rawValues = decl.value.trim().split(' ')
					decl.value = rawValues.map(v => {
						const themeValue = get(theme, `${mapping[decl.prop]}.${v}`, v)
						return Number.isInteger(themeValue) && themeValue !== 0 ? `${themeValue}px` : themeValue
					}).join(' ')
				}
			})
		})
	};
});
