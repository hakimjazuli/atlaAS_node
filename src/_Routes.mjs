// @ts-check

import { _FunctionHelpers } from './_FunctionHelpers.mjs';

/**
 * @description
 * - is a [helper class](#helper_class);
 * - extends this class or any class prefixed with "_Route" to register that route as ` system router`;
 * ```js
 * export default class extends _Routes{
 * 	get = (
 * 		...url_inputs
 * 		// all inputs is in string type;
 * 		// should never have default value, as it will mess with length of the input detection;
 * 	) => {
 *		// compose the with our singleton and helper class, then by using `__Response.__.response` you can send response to the client;
 * 	};
 * }
 * ```
 */
export class _Routes {
	/**
	 * @type {boolean}
	 */
	is_real_route = true;
	/**
	 * @param {boolean} is_real_route
	 */
	constructor(is_real_route) {
		this.is_real_route = is_real_route;
	}
}
