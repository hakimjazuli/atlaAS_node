// @ts-check

import { _MapResources } from './_MapResources.mjs';

export class _RouteWithMapResources extends _MapResources {
	/**
	 * @returns {Promise<any>}
	 */
	get = async () => {};
	/**
	 * @param {string[]} map
	 * @returns {Promise<any>}
	 */
	map_resources = async (...map) => {};
}
