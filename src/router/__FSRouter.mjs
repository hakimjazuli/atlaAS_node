// @ts-check

import http from 'http';
import { __Request } from '../utils/__Request.mjs';
import { __Response } from '../utils/__Response.mjs';

export class __FSRouter {
	/**
	 * @type {__FSRouter}
	 */
	static __;
	constructor() {
		__FSRouter.__ = this;
	}
	/**
	 * @param {http.IncomingMessage} request
	 * @param {http.ServerResponse} response
	 */
	run = async (request, response) => {
		new __Request(request);
		new __Response(response);
		if (typeof request.url === 'undefined') {
			return;
		}
		// this.parsed_url = url.parse(request.url, true);
		// if (typeof this.parsed_url === 'undefined') {
		// 	return;
		// }
		// if (this.parsed_url.pathname === '/') {
		// 	this.parsed_url.pathname = 'index';
		// }
		// this.method = request.method?.toLowerCase() ?? 'get';
	};
}
