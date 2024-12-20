// @ts-check

import { htmlReturn } from './htmlReturn.export.mjs';

/**
 * @description
 * - helper function to generate html string;
 * - combine with `IDE` extentions for emet with our [recomendations](#recomendations);
 * ```js
 * /**
 * * @param {TemplateStringsArray} strings
 * * @param {string[]} values
 * * @returns {Promise<htmlReturn>}
 * *[blank]/
 * ```
 * - returns [htmlReturnInstance](#htmlreturn)
 */
export const html = async (strings, ...values) => {
	let result = '';
	for (let i = 0; i < strings.length; i++) {
		result += strings[i];
		if (i < values.length) {
			result += values[i];
		}
	}
	return new htmlReturn(result);
};
