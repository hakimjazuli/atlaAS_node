// @ts-check

import { _Middleware } from '../middlewares/_Middleware.mjs';
import { _Routes } from './_Routes.mjs';

export class _RouteWithMiddleware extends _Routes {
	/**
	 * @param {string} method
	 */
	mw = async (method) => {};
}
