// @ts-check

export class __Response {
	/**
	 * @type {import('http').ServerResponse}
	 */
	static __;
	/**
	 *
	 * @param {import('http').ServerResponse} response
	 */
	constructor(response) {
		if (__Response.__ !== undefined) {
			return;
		}
		__Response.__ = response;
	}
}
