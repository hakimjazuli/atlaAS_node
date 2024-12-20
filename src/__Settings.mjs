// @ts-check

import { fileURLToPath } from 'url';
import { realpathSync } from 'fs';
import { __atlaAS } from './__atlaAS.mjs';
import { __Env } from './__Env.mjs';

/**
 * @description
 * - is a [singleton](#singleton)
 * - is a [setting_class](#setting_class)
 * - modify class property on the extended class to set the value;
 */
export class __Settings {
	_use_process_cwd_as_root = true;

	_default_port = 8080;
	_default_debounce_ms = 0;

	_base_identifier = 'node_modules';
	_allow_routes_caching = true;

	_file_cache_days = 60;

	_routes_path = 'routes';
	_system_file = 'mjs';
	_client_reroute_key = 'reroute';
	_routes_errors_prefix = 'errors';
	_use_stream = true;
	_app_log = 'atla-as-log';

	/**
	 * @type {string}
	 */
	route_mw_ext;

	/**
	 * @readonly
	 */
	middleware_name_ = 'mw';
	/**
	 * @type {string}
	 */
	resolved_path;
	/**
	 * @returns {[boolean,number]}
	 */
	use_caching = () => {
		return [this.if_in_production(true, false), this._file_cache_days /** days */];
	};
	/**
	 * @param {boolean} in_production_value
	 * @param {boolean} not_in_production_value
	 * @returns {boolean}
	 */
	if_in_production = (in_production_value, not_in_production_value) => {
		return __Env.__._in_production ? in_production_value : not_in_production_value;
	};
	/**
	 * @type {__Settings}
	 */
	static __;
	constructor() {
		if (__Settings.__ !== undefined) {
			return;
		}
		__Settings.__ = this;
		const resolvedPath = new URL('../sqls', import.meta.url);
		const filePath = fileURLToPath(resolvedPath);
		this.resolved_path = realpathSync(filePath);
		this.route_mw_ext = `.${this._system_file}`;
	}
}
