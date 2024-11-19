/**
 * @description
 * - is a [helper class](#helper_class);
 * - collection of usefull regex to filter strings;
 */
export class _AppRegex {
    /**
     * @param {RegExp|string} js_regex
     */
    static regex_js_to_html: (js_regex: RegExp | string) => string;
    static regex_single_line: RegExp;
    static regex_excessive_spacing: RegExp;
    static regex_html_tag_spacing: RegExp;
    static regex_excessive_html_br: RegExp;
    static regex_no_indents: RegExp;
    /**
     * Generate a regular expression pattern for matching HTML tags with the given tag name.
     * @param {string} tag_name - The name of the HTML tag to match.
     * @returns {RegExp} A regular expression pattern for matching the specified HTML tag.
     */
    static tag(tag_name: string): RegExp;
    /**
     * Generate a regular expression pattern for matching alphanumeric characters with a loose constraint on length.
     * @param {number} min - The minimum length of the alphanumeric string.
     * @param {number} max - The maximum length of the alphanumeric string.
     * @returns {RegExp} A regular expression pattern for matching alphanumeric strings within the specified length range.
     */
    static regex_alphanumeric_loose(min: number, max: number): RegExp;
    /**
     * Generate a regular expression pattern for matching alphabetic characters with a loose constraint on length.
     * @param {number} min - The minimum length of the alphabetic string.
     * @param {number} max - The maximum length of the alphabetic string.
     * @returns {RegExp} A regular expression pattern for matching alphabetic strings within the specified length range.
     */
    static regex_alpha_loose(min: number, max: number): RegExp;
    /**
     * Generate a regular expression pattern for matching numeric strings with a loose constraint on length.
     * @param {number} min - The minimum length of the numeric string.
     * @param {number} max - The maximum length of the numeric string.
     * @returns {RegExp} A regular expression pattern for matching numeric strings within the specified length range.
     */
    static regex_numeric_loose(min: number, max: number): RegExp;
    static regex_float: RegExp;
    static regex_non_alphanumeric: RegExp;
    /**
     * Generate a regular expression pattern for matching enum values.
     * @param {...string} allowed_values - An array of allowed enum values.
     * @returns {RegExp} A regular expression pattern for matching enum values.
     */
    static regex_enum(...allowed_values: string[]): RegExp;
}
