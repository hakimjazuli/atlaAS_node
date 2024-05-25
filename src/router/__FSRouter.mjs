// @ts-check

import http from 'http';
import { __Request } from '../utils/__Request.mjs';
import { __Response } from '../utils/__Response.mjs';

export class __FSRouter {
	/**
	 * @type {__FSRouter}
	 */
	// @ts-ignore
	static __ = null;
	constructor() {
		if (__FSRouter.__ !== null) {
			return;
		}
		__FSRouter.__ = this;
	}
	/**
	 * @param {http.IncomingMessage} request
	 * @param {http.ServerResponse} response
	 */
	run = async (request, response) => {
		new __Request(request);
		new __Response(response);
	};
}
