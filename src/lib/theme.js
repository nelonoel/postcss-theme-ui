import defaults from "../defaults";

const convertIntToUnit = (unit = "px", ...args) => {
	args.forEach(scale => {
		for (let [k, v] of Object.entries(scale)) {
			if (Number.isInteger(v) && v !== 0) {
				scale[k] = `${v}${unit}`;
			}
		}
	});
};

const addNegativeKeys = (...args) => {
	args.forEach(scale => {
		for (let [k, v] of Object.entries(scale)) {
			k = parseInt(k);
			if (Number.isInteger(k) && k > 0) {
				scale[-k] = `-${v}`;
			}
		}
	});
};

const normalizeTheme = theme => {
	convertIntToUnit(
		"px",
		theme.breakpoints,
		theme.fontSizes,
		theme.radii,
		theme.sizes,
		theme.space
	);

	addNegativeKeys(theme.space);

	return theme;
};

const getTheme = options => {
	return normalizeTheme({ ...defaults, ...options });
};

export default getTheme;
