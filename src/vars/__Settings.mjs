// @ts-check

import process from 'process';

export class __Settings {
	_default_port = 8080;
	_default_debounce_ms = 0;

	_routes_path = 'routes';
	_public_path = 'public';
	_system_file = ['mjs'];
	_client_reroute_key = 'reroute';
	_routes_errors_prefix = '/errors/';

	/**
	 * @private
	 * @readonly
	 */
	middleware_name_ = 'mw';
	middleware_name = () => this.middleware_name_;
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
