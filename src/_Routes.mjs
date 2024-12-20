// @ts-check

import { _FunctionHelpers } from './_FunctionHelpers.mjs';

/**
 * @description
 * - is a [helper class](#helper_class);
 * - extends this class or any class prefixed with "_Route" to register that route as ` system router`;
 * ```js
 * export default class extends _Routes{
 * 	/** [blank]@type {import('@html_first/atla-as_node').routeGetMethod} *[blank]/
 * // use type routeMethod instead for non get method
 * 	get = (
 * 		...url_inputs
 * 		// all inputs is in string type;
 * 		// should never have default value, as it will mess with length of the input detection;
 * 	) => {
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
