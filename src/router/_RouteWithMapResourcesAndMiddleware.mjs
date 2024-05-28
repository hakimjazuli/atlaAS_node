// @ts-check

import { _RouteWithMapResources } from './_RouteWithMapResources.mjs';

export class _RouteWithMapResourcesAndMiddleware extends _RouteWithMapResources {
	/**
	 * @param {string} method
	 */
	mw = (method) => {};
}
