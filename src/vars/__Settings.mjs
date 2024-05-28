// @ts-check

import process from 'process';
import { __Env } from './__Env.mjs';

export class __Settings {
	_default_port = 8080;
	_default_debounce_ms = 0;

	_routes_path = 'routes';
	_public_path = 'public';
	_system_file = ['mjs', 'ts'];
	_client_reroute_key = 'reroute';
	_routes_errors_prefix = '/errors/';
	_use_stream = true;

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
	 * @type {string}
	 */
	app_root;
	/**
	 * @type {__Settings}
	 */
	static __;
	constructor() {
		if (__Settings.__ !== undefined) {
			return;
		}
		this.app_root = process.cwd();
		__Settings.__ = this;
	}
}
