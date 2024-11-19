// @ts-check

/**
 * @description
 * - is a [singleton](#singleton)
 * - placeholder for for environtmental values;
 * - always put the this extended class on `.ignore` on your shared code management;
 * - modify class property on the extended class to set the value;
 */
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
