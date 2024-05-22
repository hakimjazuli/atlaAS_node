// @ts-check

import path from 'path';

import { _FunctionHelpers } from '../utils/_FunctionHelpers.mjs';

export class _Routes {
	/**
	 * @type {boolean}
	 */
	is_real_route = true;
	/**
	 * @param {boolean} [return_as_array=false]
	 * @returns {string|array}
	 */
	static route = (return_as_array = false) => {
		// const route_array = _FunctionHelpers.class_name_as_array(this.name, []);
		// if (return_as_array) {
		// 	return route_array;
		// }
		// return `/${path.join(...route_array)}`;
	};
}
