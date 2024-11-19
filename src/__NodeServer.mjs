// @ts-check

import http from 'http';
import process from 'process';
import { __Settings } from './__Settings.mjs';
import { __Env } from './__Env.mjs';
import { queueFIFO } from './queueFIFO.mjs';
import { _QueueObjectFIFO } from '@html_first/simple_queue';
import { fsRouter } from './fsRouter.mjs';
import { __Response } from './__Response.mjs';
import { __Request } from './__Request.mjs';

/**
 * @description
 * - is a [singleton](#singleton)
 * - it's for library internal, however it contains properties and methods, that might be usefull for general monitoring;
 */
export class __NodeServer {
	/**
	 * @type {__NodeServer}
	 */
	static __;
	/**
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
	/**
	 * @type {fsRouter}
	 */
	fs_router;
	constructor() {
		if (__NodeServer.__ !== undefined) {
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
		queueFIFO.__.assign(
			new _QueueObjectFIFO(async () => {
				new __Request(request);
				new __Response(response);
				this.fs_router = new fsRouter();
				await this.fs_router.run();
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
	/**
	 * @private
	 * @param {number} port
	 * @returns {boolean}
	 */
	static is_valid_port = (port) => {
		return Number.isInteger(port) && port >= 0 && port <= 65535;
	};

	/**
	 * @param {number} [overwrite_port]
	 */
	start_server = (overwrite_port) => {
		if (
			(!overwrite_port || !__NodeServer.is_valid_port(overwrite_port)) &&
			__Env.__._in_production
		) {
			this.listen_to_random_port();
		} else {
			this.listen_to_port();
		}
		const addres = this.server.address();
		if (addres) {
			// @ts-ignore
			console.log(`listen at: http://localhost:${addres.port}`);
		}
		process.on('exit', this.close_server);
		process.on('beforeExit', this.close_server);
		process.on('uncaughtException', this.close_server);
		process.on('SIGINT', this.close_server);
	};
	is_running = true;
	/**
	 * @param {...any} errors
	 */
	close_server = (...errors) => {
		if (!this.is_running) {
			return;
		}
		this.server.close();
		__Settings.__.log_to_file({ prefix: 'close-server', content: JSON.stringify({ errors }) });
		this.is_running = false;
		console.log({ stats: 'server closed' });
		process.exit(1);
	};
}
