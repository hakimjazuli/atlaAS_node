// @ts-check

export class __Env {
	_in_production = false;

	/**
	 * @type {__Env}
	 */
	// @ts-ignore
	static __ = null;
	constructor() {
		if (__Env.__ !== null) {
			return;
		}
		__Env.__ = this;
	}
}
