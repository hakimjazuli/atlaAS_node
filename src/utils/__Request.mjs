// @ts-check

import http from 'http';

export class __Request {
	/**
	 * @type {http.IncomingMessage}
	 */
	// @ts-ignore
	static __ = null;
	/**
	 *
	 * @param {http.IncomingMessage} request
	 */
	constructor(request) {
		if (__Request.__ !== null) {
			return;
		}
		__Request.__ = request;
	}
}
