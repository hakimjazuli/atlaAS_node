// @ts-check

import { __atlaAS } from './__atlaAS.mjs';

/**
 * @typedef {import('http').ServerResponse} ServerResponse_
 * @param {ServerResponse_} response_instance
 */
export function response_(response_instance) {
	return Object.assign(response_instance, {
		atlaas_html() {
			response_instance.setHeader('Content-Type', 'text/html; charset=UTF-8');
			return response_instance;
		},
		atlaas_json() {
			response_instance.setHeader('Content-Type', 'application/json');
			return response_instance;
		},
	});
}
