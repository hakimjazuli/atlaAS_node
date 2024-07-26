// @ts-check

import fs from 'fs';
import { join as path_join } from 'path';
import { _Middleware } from './_Middleware.mjs';
import { __atlaAS } from '../__atlaAS.mjs';
import { __Request } from '../utils/__Request.mjs';
import { _FunctionHelpers } from '../utils/_FunctionHelpers.mjs';
import { __Settings } from '../vars/__Settings.mjs';

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
	/**
	 *
	 * @returns {Promise<boolean>}
	 */
	check_mw = async () => {
		const mw = this.current_middleware.replace(
			path_join(__atlaAS.__.app_root, __Settings.__._routes_path, 'index'),
			path_join(__atlaAS.__.app_root, __Settings.__._routes_path)
		);
		try {
			const stats = fs.statSync(mw);
			if (!stats.isFile()) {
				return true;
			}
		} catch (error) {
			return true;
		}
		const mw_ref = await _FunctionHelpers.dynamic_import(mw);
		if (!mw_ref) {
			return true;
		}
		const mw_instance = new mw_ref.default();
		if (mw_instance instanceof _Middleware) {
			__atlaAS.__.assign_query_param_to_class_property(mw_instance);
			return await mw_instance.mw(__Request.__.method);
		}
		return true;
	};
}
