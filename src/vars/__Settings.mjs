// @ts-check

import process from 'process';

export class __Settings {
	_default_port = 8080;
	_default_debounce_ms = 0;

	_routes_path = 'routes';
	_public_path = 'public';
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
