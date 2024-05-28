// @ts-check

export class __Response {
	/**
	 * @type {__Response}
	 */
	static __;
	/**
	 * @type {import('http').ServerResponse}
	 */
	response;
	/**
	 *
	 * @param {import('http').ServerResponse} response
	 */
	constructor(response) {
		this.response = response;
		__Response.__ = this;
	}
	/**
	 * Description
	 * @returns {__Response}
	 */
	html = () => {
		this.response.setHeader('Content-Type', 'text/html; charset=UTF-8');
		return __Response.__;
	};
	/**
	 * Description
	 * @returns {__Response}
	 */
	json = () => {
		this.response.setHeader('Content-Type', 'application/json');
		return __Response.__;
	};
}
