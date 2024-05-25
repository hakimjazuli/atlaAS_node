// @ts-check

export class __Env {
	_in_production = false;

	/**
	 * @type {__Env}
	 */
	static __;
	constructor() {
		if (__Env.__ !== undefined) {
			return;
		}
		__Env.__ = this;
	}
}
