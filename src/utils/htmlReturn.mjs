// @ts-check

import { _AppRegex } from './_AppRegex.mjs';

export class htmlReturn {
	/**
	 * @returns {string}
	 */
	string = () => {
		return this.string_;
	};
	/**
	 * @returns {string}
	 */
	no_indent = () => {
		return this.string_.replace(_AppRegex.regex_no_indents, '');
	};
	/**
	 * @returns {string}
	 */
	single_line = () => {
		return this.string_
			.replace(_AppRegex.regex_single_line, ' ')
			.replace(_AppRegex.regex_excessive_spacing, ' ')
			.replace(/> /, '>')
			.replace(/ </, '<')
			.trim();
	};
	/**
	 * @private
	 * @type {string}
	 */
	string_;
	/**
	 * @param {string} string_
	 */
	constructor(string_) {
		this.string_ = string_;
	}
}
