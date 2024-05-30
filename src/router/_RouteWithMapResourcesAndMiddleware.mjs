// @ts-check

import { _RouteWithMapResources } from './_RouteWithMapResources.mjs';

export class _RouteWithMapResourcesAndMiddleware extends _RouteWithMapResources {
	/**
	 * @param {string} method
	 * @returns {Promise<any>}
	 */
	mw = async (method) => {};
}
