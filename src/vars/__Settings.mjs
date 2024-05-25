// @ts-check

export class __Settings {
	_default_port = 8080;
	_default_debounce_ms = 30;

	static _routes_class = '';
	/**
	 * @type {__Settings}
	 */
	// @ts-ignore
	static __;
	constructor() {
		if (__Settings.__ !== null) {
			return;
		}
		__Settings.__ = this;
	}
}
