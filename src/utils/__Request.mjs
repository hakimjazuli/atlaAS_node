// @ts-check

import http from 'http';

export class __Request {
	/**
	 * @type {__Request}
	 */
	static __;
	/**
	 *
	 * @param {http.IncomingMessage} request
	 */
	constructor(request) {
		this.request = request;
	}
	/**
	 * @type {http.IncomingMessage}
	 */
	request;
}
