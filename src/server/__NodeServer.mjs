// @ts-check

import http from 'http';
import { __Settings } from '../vars/__Settings.mjs';
import { __Env } from '../vars/__Env.mjs';
import { __QueueFIFO } from '../queue/__QueueFIFO.mjs';
import { _QueueObjectFIFO } from '@html_first/simple_queue';
import { __FSRouter } from '../router/__FSRouter.mjs';

export class __NodeServer {
	/**
	 * @type {__NodeServer}
	 */
	// @ts-ignore
	static __ = null;
	/**
	 * @private
	 * @type {import('http').Server}
	 */
	server;
	/**
	 * @type {http.IncomingMessage}
	 */
	request;
	/**
	 * @type {http.ServerResponse}
	 */
	response;
	constructor() {
		if (__NodeServer.__ !== null) {
			return;
		}
		this.server = http.createServer(this.request_handler);
		__NodeServer.__ = this;
	}
	/**
	 * @param {http.IncomingMessage} request
	 * @param {http.ServerResponse} response
	 */
	request_handler = (request, response) => {
		__QueueFIFO.__.assign(
			new _QueueObjectFIFO(async () => {
				await __FSRouter.__.run(request, response);
			}, __Settings.__._default_debounce_ms)
		);
	};
	/**
	 * @private
	 */
	listen_to_random_port = () => {
		try {
			this.server.listen(0);
		} catch (error) {
			this.listen_to_random_port();
		}
	};
	/**
	 * @private
	 */
	listen_to_port = () => {
		try {
			this.server.listen(__Settings.__._default_port);
		} catch (error) {
			this.listen_to_random_port();
		}
	};
	start_server = () => {
		if (__Settings.__._default_port && !__Env.__._in_production) {
			this.listen_to_port();
		} else {
			this.listen_to_random_port();
		}
		const addres = this.server.address();
		if (addres) {
			// @ts-ignore
			console.log(`listen at: http://localhost:${addres.port}`);
		}
	};
	close_server = () => {
		this.server.close();
	};
}
