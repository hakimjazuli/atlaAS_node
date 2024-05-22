// @ts-check

import http from 'http';

export class __Response {
	/**
	 * @type {__Response}
	 */
	static __;
	/**
	 *
	 * @param {http.ServerResponse} response
	 */
	constructor(response) {
		this.response = response;
	}
	/**
	 * @type {http.ServerResponse}
	 */
	response;
}
