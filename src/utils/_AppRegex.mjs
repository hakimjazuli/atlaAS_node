// @ts-check

export class _AppRegex {
	/**
	 * @param {RegExp|string} js_regex
	 */
	static regex_js_to_html = (js_regex) => {
		let html_regex = js_regex.toString();
		html_regex = html_regex.slice(1, -1);
		html_regex = html_regex.replace(/\//g, '\\/');
		return html_regex;
	};
	static regex_single_line = /\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->|\r|\n|\t|\s{2,}|\/\/ .*$/gm;
	static regex_excessive_spacing = /\s{2,}/gm;
	static regex_html_tag_spacing = /\s*(?=[><\/])/gm;
	static regex_excessive_html_br = /(<br>){2,}/g;
	static regex_no_indents = /^[\s]+| {2,}/gm;

	/**
	 * Generate a regular expression pattern for matching HTML tags with the given tag name.
	 * @param {string} tag_name - The name of the HTML tag to match.
	 * @returns {RegExp} A regular expression pattern for matching the specified HTML tag.
	 */
	static tag(tag_name) {
		return new RegExp(`<${tag_name}(.*?)>|<\\/${tag_name}>`, 'gm');
	}
	/**
	 * Generate a regular expression pattern for matching alphanumeric characters with a loose constraint on length.
	 * @param {number} min - The minimum length of the alphanumeric string.
	 * @param {number} max - The maximum length of the alphanumeric string.
	 * @returns {RegExp} A regular expression pattern for matching alphanumeric strings within the specified length range.
	 */
	static regex_alphanumeric_loose(min, max) {
		return new RegExp(`^(?=.*[a-zA-Z0-9]).{${min},${max}}$`);
	}
	/**
	 * Generate a regular expression pattern for matching alphabetic characters with a loose constraint on length.
	 * @param {number} min - The minimum length of the alphabetic string.
	 * @param {number} max - The maximum length of the alphabetic string.
	 * @returns {RegExp} A regular expression pattern for matching alphabetic strings within the specified length range.
	 */
	static regex_alpha_loose(min, max) {
		return new RegExp(`^(?=.*[a-zA-Z]).{${min},${max}}$`);
	}
	/**
	 * Generate a regular expression pattern for matching numeric strings with a loose constraint on length.
	 * @param {number} min - The minimum length of the numeric string.
	 * @param {number} max - The maximum length of the numeric string.
	 * @returns {RegExp} A regular expression pattern for matching numeric strings within the specified length range.
	 */
	static regex_numeric_loose(min, max) {
		return new RegExp(`^[0-9]{${min},${max}}$`);
	}
	static regex_float = /^[-.|0-9]{1,}$/;
	static regex_non_alphanumeric = /[^a-zA-Z0-9_]+/;
	/**
	 * Generate a regular expression pattern for matching enum values.
	 * @param {...string} allowed_values - An array of allowed enum values.
	 * @returns {RegExp} A regular expression pattern for matching enum values.
	 */
	static regex_enum(...allowed_values) {
		const escapedValues = allowed_values.map((value) =>
			value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
		);
		const pattern = `^(${escapedValues.join('|')})$`;
		return new RegExp(pattern);
	}
}
