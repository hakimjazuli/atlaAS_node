// @ts-check

import http from 'http';

export class __Response {
	/**
	 * @type {http.ServerResponse}
	 */
	static __;
	/**
	 *
	 * @param {http.ServerResponse} response
	 */
	constructor(response) {
		__Response.__ = response;
	}
}
