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
	html = () => {
		__Response.__.setHeader('Content-Type', 'text/html; charset=UTF-8');
		return __Response.__;
	};
	json = () => {
		__Response.__.setHeader('Content-Type', 'application/json');
		return __Response.__;
	};
}
