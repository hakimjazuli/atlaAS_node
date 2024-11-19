// @ts-check

import { _Routes } from './_Routes.mjs';

/**
 * @description
 * - is a [helper class](#helper_class);
 * - extended class from [_Routes](#_routes);
 * - serve files inside named folder;
 * > - some_route.mjs
 * > - assets.mjs
 * > - assets(dir)
 * > > - test.txt
 * > > - nested(dir)
 * > > > - test2.txt
 * ```js
 * // /routes/assets.mjs
 * export default class extends _MapResources {}
 * ```
 */
export class _MapResources extends _Routes {
	/**
	 * overwrite this get method to use it as this route middleware;
	 * @param {string[]} uri_array
	 * @returns {Promise<any>}
	 */
	map_resources = async (...uri_array) => {
		/** your middleware script goes here */
	};
}
