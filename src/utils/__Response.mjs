// @ts-check

import http from 'http';

export class __Response {
	/**
	 * @type {http.ServerResponse}
	 */
	// @ts-ignore
	static __ = null;
	/**
	 *
	 * @param {http.ServerResponse} response
	 */
	constructor(response) {
		if (__Response.__ !== null) {
			return;
		}
		__Response.__ = response;
	}
}
