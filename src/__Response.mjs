// @ts-check

/**
 * @description
 * - is a [singleton](#singleton)
 * - helper for node http["ServerResponse"];
 */
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
	 * @returns {__Response["response"]}
	 */
	html = () => {
		this.response.setHeader('Content-Type', 'text/html; charset=UTF-8');
		return this.response;
	};
	/**
	 * @returns {__Response["response"]}
	 */
	json = () => {
		this.response.setHeader('Content-Type', 'application/json');
		return this.response;
	};
}
