// @ts-check

import { __Settings } from './__Settings.mjs';

/**
 * @description
 * - is a [helper class](#helper_class);
 * - extends this to `mw.mjs` on a folder, that folder and it's subfolders will have this `mw` method called as middleware;
 * - `_Routes` class that also acts as middleware, it's `mw` method will be called `only` when that specific `routes` is requested, no matter which http method is being called;
 * ```js
 * // /routes/api/mw.js
 * // in wich case it will be called on any request to '/api/..' and all of it's sub path;
 * export default class extends _Middleware {
 * 	/** [blank]@type {import('@html_first/atla-as_node').mw_method} *[blank]/
 * 	mw = async ({ mw, mw_err, chains }) => {
 * 		// return true; // you need to manually add return boolean when using `_Middleware` derivative;
 * 		return await chains(...
 * 		/**
 * 		 * - generate middleware callback:
 * 		 * > - mw : (req, res, next) => (void|Promise<void>);
 * 		 * > - mw_err : (err, req, res, next) => (void|Promise<void>);
 * 		 * - both are only functions as typehelper;
 * 		 * - if your middleware are structured like either of that, you can just write the reference;
 * 		 *[blank]/
 * 		);
 * };
 * }
 * ```
 * ```js
 * // /routes/index.mjs
 * // it will be called only on request to uri root ('/index', '/' or '')
 * export default class extends _RouteWithMiddleware {
 *	// the same with above;
 * 	mw = async ({ ...options }) => {};
 *	// however it also can have http_method of it's own to call, if needed;
 *  get = async () => {};
 * }
 * ```
 * - this middleware callback are compliance with js `middleware architecture/pattern`, it has `request`, `response`, `next` parameter,
 * > - `request` are instance extended from `http.IncomingMessage`;
 * > - `response` are instance extended from `http.ServerResponse`;
 * > - we added to `request` and `reponse` `method`/`property` prefixed with `atlaas_`;
 * > - `next` are callback to allow to proceed to next callback (middleware or route);
 * > > - by default it will not be called, if you use `_Middleware` and it's derivatives, without manually calling it, the request will imediately be blocked from calling next callback;
 */
export class _Middleware {
	/**
	 * @type {import('./route_method.type.mjs').mw_method}
	 */
	mw = async () => {
		return false;
	};
}
