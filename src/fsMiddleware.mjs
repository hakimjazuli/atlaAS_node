// @ts-check

import { statSync as stat_sync } from 'fs';
import { join as path_join } from 'path';
import { __atlaAS } from './__atlaAS.mjs';
import { __Settings } from './__Settings.mjs';
import { _FunctionHelpers } from './_FunctionHelpers.mjs';
import { _Middleware } from './_Middleware.mjs';
import { mwInputs } from './mwInputs.export.mjs';

export class fsMiddleware {
	/**
	 * @private
	 * @type {Map<any, boolean>}
	 */
	allow_cache = new Map();
	/**
	 * @param {any} identifier
	 * @param {()=>Promise<boolean>} callback
	 */
	is_mw_allowed = async (identifier, callback) => {
		const current = this.allow_cache.get(identifier);
		if (current === true) {
			return true;
		}
		const new_bool = await callback();
		this.allow_cache.set(identifier, new_bool);
		return new_bool;
	};
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
			const stats = stat_sync(this.current_route);
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
			const stats = stat_sync(`${mw}${__Settings.__.route_mw_ext}`);
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
		const mw_instance = new mw_ref();
		if (mw_instance instanceof _Middleware) {
			__atlaAS.__.assign_query_param_to_class_property(mw_instance);
			return await mw_instance.mw(mwInputs.mw_chain_helper);
		}
		return true;
	};
}
