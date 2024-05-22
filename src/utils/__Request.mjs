// @ts-check

import http from 'http';

export class __Request {
	/**
	 * @type {http.IncomingMessage}
	 */
	static __;
	/**
	 *
	 * @param {http.IncomingMessage} request
	 */
	constructor(request) {
		__Request.__ = request;
	}
}
