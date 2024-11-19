// @ts-check

/**
 * @description
 * - is a [helper class](#helper_class);
 * - extends this to `mw.mjs` on a folder, that folder and it's subfolders will have this `mw` method called as middleware;
 * - `_Routes` class that also acts as middleware, it's `mw` method will be called `only` when that specific `routes` is requested, no matter which http method is being called;
 * ```js
 * // /routes/api/mw.js
 * export default class extends _Middleware {
 * 	mw = (lower_case_http_method) => {
 * 		// return boolean
 * 		// true to allow to proceed to next method calls;
 * 		// false to stop method calls;
 * 		// you can also uses `__Response.__.response` to determine response before returning;
 *  }
 * }
 * ```
 * ```js
 * // /routes/index.mjs
 * export default class extends _RouteWithMiddleware {
 * 	mw = () => {
 * 		// the same with above;
 * 		// however it also can have method to call on its own if needed;
 *  }
 *  get = () => {};
 * }
 * ```
 */
export class _Middleware {
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
