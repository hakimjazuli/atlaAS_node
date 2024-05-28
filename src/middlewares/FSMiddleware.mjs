// @ts-check

import fs from 'fs';
import { _Middleware } from './_Middleware.mjs';
import { __atlaAS } from '../__atlaAS.mjs';
import { __Request } from '../utils/__Request.mjs';
import { _FunctionHelpers } from '../utils/_FunctionHelpers.mjs';

export class FSMiddleware {
	/**
	 * @type {string}
	 */
	current_middleware;
	/**
	 * @type {string}
	 */
	current_route;
	/**
	 * @returns {boolean}
	 */
	is_folder_exist = () => {
		try {
			const stats = fs.statSync(this.current_route);
			return stats.isDirectory();
		} catch (err) {
			return false;
		}
	};
	check_mw = async () => {
		const mw = this.current_middleware;
		try {
			const stats = fs.statSync(this.current_middleware);
			if (!stats.isFile()) {
				return;
			}
		} catch (error) {
			return;
		}
		const mw_ref = await _FunctionHelpers.dynamic_import(mw);
		if (!mw_ref) {
			return;
		}
		const mw_instance = new mw_ref();
		if (mw_instance instanceof _Middleware) {
			__atlaAS.__.assign_query_param_to_class_property(mw_instance);
			mw_instance.mw(__Request.__.method);
		}
	};
}
