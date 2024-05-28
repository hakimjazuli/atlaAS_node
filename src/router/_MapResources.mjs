// @ts-check

import { _Routes } from './_Routes.mjs';

export class _MapResources extends _Routes {
	/**
	 * overwrite this get method to use it as this route middleware;
	 * @param {string[]} uri_array
	 */
	map_resources = async (...uri_array) => {
		/** your middleware script goes here */
	};
}
