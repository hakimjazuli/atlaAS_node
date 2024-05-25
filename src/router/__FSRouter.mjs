// @ts-check

import { __Request } from '../utils/__Request.mjs';
import { __Response } from '../utils/__Response.mjs';

export class __FSRouter {
	/**
	 * @type {__FSRouter}
	 */
	static __;
	constructor() {
		if (__FSRouter.__ !== undefined) {
			return;
		}
		__FSRouter.__ = this;
	}
	/**
	 * @param {import('http').IncomingMessage} request
	 * @param {import('http').ServerResponse} response
	 */
	run = async (request, response) => {
		new __Request(request);
		new __Response(response);
	};
}
