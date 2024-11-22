// @ts-check

import he from 'he';
import { __Settings } from './__Settings.mjs';
import { TLSSocket } from 'tls';
import { __atlaAS } from './__atlaAS.mjs';

/**
 * @param {import('net').Socket} request_socket
 * @returns {boolean}
 */
const atlaas_assign_http = (request_socket) => {
	return request_socket instanceof TLSSocket && request_socket.encrypted;
};

/**
 * @param {import('http').IncomingMessage} request
 */
export const request_ = (request) => {
	if (!request.url || !request.method) {
		return;
	}
	const atlaas_method = request.method.toLowerCase();
	const request_uri = request.url.split('?');
	const atlaas_uri = request_uri[0].replace(/^\/+|\/+$/g, '');
	let atlaas_query_param;
	let atlaas_query_params_object;
	/**
	 * @type {'https'|'http'}
	 */
	let atlaas_http_mode;
	if (request_uri.length > 1) {
		atlaas_query_param = request_uri[1];
		const parsed_url = new URL(request.url, `${atlaas_http_mode}://${request.headers.host}`);
		atlaas_query_params_object = Object.fromEntries(parsed_url.searchParams);
	}
	let atlaas_is_https;
	if ((atlaas_is_https = atlaas_assign_http(request.socket))) {
		atlaas_http_mode = 'https';
	} else {
		atlaas_http_mode = 'http';
	}
	/**
	 * @type {string[]}
	 */
	let atlaas_uri_array = [];
	const atlaas_set_uri = () => {
		let uri = atlaas_uri.split('/');
		if (uri.length !== 1) {
			uri = uri.map((string) => he.encode(string));
			atlaas_uri_array = uri;
			return;
		}
		if (uri[0] === '') {
			uri[0] = 'index';
		} else if (uri[0].includes('.')) {
			uri[1] = uri[0];
			uri[0] = 'index';
		}
		uri = uri.map((string) => he.encode(string));
		atlaas_uri_array = uri;
	};

	atlaas_set_uri();
	const modified_request = Object.assign(request, {
		atlaas_is_https,
		atlaas_method,
		atlaas_http_mode,
		atlaas_uri,
		atlaas_uri_array,
		atlaas_query_param,
		atlaas_query_params_object,
		atlaas_method_params: () => {
			switch (modified_request.atlaas_method) {
				case 'get':
					return modified_request.atlaas_query_params_object;
				default:
					let body = '';
					request.on('data', (chunk) => {
						body += chunk.toString();
					});
					const post_params = new URLSearchParams(body);
					return Object.fromEntries(post_params);
			}
		},
	});
	return modified_request;
};
