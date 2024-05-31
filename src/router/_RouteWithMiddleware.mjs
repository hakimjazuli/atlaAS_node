// @ts-check

import { Middleware } from '../middlewares/Middleware.mjs';
import { _Routes } from './_Routes.mjs';

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
