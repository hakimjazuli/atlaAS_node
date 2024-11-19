// @ts-check

import { __Request } from './__Request.mjs';
import { __Response } from './__Response.mjs';

/**
 * @description
 * - is a [helper class](#helper_class);
 * - `allow` incoming `cors` connections with filters;
 */
export class _Cors {
	/**
	 * @param {string[]} allowed_origins - If it contains '*', it allows all origins.
	 * @param {string[]} allowed_methods - If it contains '*', it allows all methods.
	 * @param {string[]} allowed_headers - If it contains '*', it allows all headers.
	 * @param {Number} max_age - Max age in days.
	 */
	static allow(allowed_origins = [], allowed_methods = [], allowed_headers = [], max_age = 1) {
		const origin = __Request.__.request.headers.origin || '';
		const response = __Response.__;
		if (allowed_origins.includes('*')) {
			response.response.setHeader('Access-Control-Allow-Origin', '*');
		} else if (allowed_origins.includes(origin)) {
			response.response.setHeader('Access-Control-Allow-Origin', origin);
		}
		if (allowed_methods.includes('*')) {
			response.response.setHeader('Access-Control-Allow-Methods', '*');
		} else if (allowed_methods.length > 0) {
			response.response.setHeader('Access-Control-Allow-Methods', allowed_methods.join(', '));
		}
		if (allowed_headers.includes('*')) {
			response.response.setHeader('Access-Control-Allow-Headers', '*');
		} else if (allowed_headers.length > 0) {
			response.response.setHeader('Access-Control-Allow-Headers', allowed_headers.join(', '));
		}
		if (__Request.__.method === 'options') {
			if (allowed_methods.includes('*')) {
				response.response.setHeader('Access-Control-Allow-Methods', '*');
			} else if (allowed_methods.length > 0) {
				response.response.setHeader(
					'Access-Control-Allow-Methods',
					allowed_methods.join(', ')
				);
			}
			if (allowed_headers.includes('*')) {
				response.response.setHeader('Access-Control-Allow-Headers', '*');
			} else if (allowed_headers.length > 0) {
				response.response.setHeader(
					'Access-Control-Allow-Headers',
					allowed_headers.join(', ')
				);
			}
			response.response.setHeader('Access-Control-Max-Age', max_age * 86400);
			response.response.statusCode = 204;
			response.response.end();
			return false;
		}
		return true;
	}
}
