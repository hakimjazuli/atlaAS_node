// @ts-check
/**
 * Description
 * @param {TemplateStringsArray} strings
 * @param {string[]} values
 * @returns {Promise<string>}
 */
export const html = async (strings, ...values) => {
	let result = '';
	for (let i = 0; i < strings.length; i++) {
		result += strings[i];
		if (i < values.length) {
			result += values[i];
		}
	}
	return result;
};
