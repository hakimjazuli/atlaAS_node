// @ts-check

import { _Middleware } from './_Middleware.mjs';
import { _Routes } from './_Routes.mjs';

/**
 * @description
 * - is a [helper class](#helper_class);
 * - extended class from [_MapResources](#_mapresources);
 * - also has [mw](#_middleware) method that functions as middleware;
 */
export class _RouteWithMiddleware extends _Routes {
	/**
	 * @param {string} method
	 * @returns {Promise<boolean>}
	 */
	mw = async (method) => {
		/**
		 * mock return;
		 */
		return true;
	};
}