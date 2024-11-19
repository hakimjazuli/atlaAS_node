// @ts-check

import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join as path_join } from 'path';
import { __atlaAS } from './__atlaAS.mjs';
import { __Env } from './__Env.mjs';

/**
 * @description
 * - is a [singleton](#singleton)
 * - modify class property on the extended class to set the value;
 */
export class __Settings {
	_use_process_cwd_as_root = true;

	_default_port = 8080;
	_default_debounce_ms = 0;

	_base_identifier = 'node_modules';
	_allow_routes_caching = true;

	_routes_path = 'routes';
	_system_file = ['mjs'];
	_client_reroute_key = 'reroute';
	_routes_errors_prefix = 'errors';
	_use_stream = true;
	_app_log = 'atla-as-log';
	/**
	 * @private
	 * @type {string|undefined}
	 */
	log_dir = undefined;
	/**
	 * @param {Object} options
	 * @param {string} options.prefix
	 * @param {string} options.content
	 */
	log_to_file = ({ prefix, content }) => {
		let log_dir = this.log_dir;
		if (!log_dir) {
			log_dir = this.log_dir = path_join(__atlaAS.__.app_root, 'logs');
		}
		if (!existsSync(log_dir)) {
			mkdirSync(log_dir, { recursive: true });
		}
		const logPath = path_join(log_dir, `${prefix}-${this._app_log}-${Date.now()}.json`);
		writeFileSync(logPath, content);
		console.log(`Log written to: ${logPath}`);
	};
	/**
	 * @private
	 * @readonly
	 */
	middleware_name_ = 'mw';
	middleware_name = () => this.middleware_name_;
	/**
	 * @returns {[boolean,number]}
	 */
	use_caching = () => {
		return [this.if_in_production(true, false), 60 /** days */];
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
	}
}
