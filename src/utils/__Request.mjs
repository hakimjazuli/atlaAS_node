// @ts-check

import { join as path_join } from 'path';
import { __Settings } from '../vars/__Settings.mjs';
import { TLSSocket } from 'tls';

export class __Request {
	/**
	 * @type {__Request}
	 */
	static __;
	/**
	 * @type {import('http').IncomingMessage}
	 */
	request;
	/**
	 * @type {string[]}
	 */
	uri_array;
	/**
	 * @type {string}
	 */
	public_path;
	/**
	 * @type {Object.<string, string>}
	 */
	query_params_arrray = {};
	/**
	 * @type {string}
	 */
	uri;
	/**
	 * @type {string}
	 */
	query_param;
	/**
	 * @type {string}
	 */
	method;
	/**
	 * @type {boolean}
	 */
	is_https;
	/**
	 * @type {'http'|'https'}
	 */
	http_mode;
	/**
	 *
	 * @param {import('http').IncomingMessage} request
	 */
	constructor(request) {
		if (!request.url || !request.method) {
			return;
		}
		__Request.__ = this;
		this.request = request;
		if ((this.is_https = this.assign_http())) {
			this.http_mode = 'https';
		} else {
			this.http_mode = 'http';
		}
		const settings = __Settings.__;
		this.public_path = path_join(settings.app_root, settings._public_path);
		this.method = request.method.toLowerCase();
		const request_uri = request.url.split('?');
		this.uri = request_uri[0].replace(/^\/+|\/+$/g, '');
		this.set_uri();
		if (request_uri.length > 1) {
			this.query_param = request_uri[1];
			const parsed_url = new URL(request.url, `${this.http_mode}://${request.headers.host}`);
			this.query_params_arrray = Object.fromEntries(parsed_url.searchParams);
		}
	}
	/**
	 * @private
	 */
	assign_http = () => {
		return this.request.socket instanceof TLSSocket && this.request.socket.encrypted;
	};
	/**
	 * @private
	 */
	set_uri = () => {
		const uri = this.uri.split('/');
		if (uri.length !== 1) {
			this.uri_array = uri;
			return;
		}
		if (uri[0] === '') {
			uri[0] = 'index';
		} else if (uri[0].includes('.')) {
			uri[1] = uri[0];
			uri[0] = 'index';
		}
		this.uri_array = uri;
	};
	method_params = () => {
		switch (this.method) {
			case 'get':
				return this.query_params_arrray;
			default:
				let body = '';
				this.request.on('data', (chunk) => {
					body += chunk.toString();
				});
				const post_params = new URLSearchParams(body);
				return Object.fromEntries(post_params);
		}
	};
}
