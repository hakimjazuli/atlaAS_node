// @ts-check

import http from 'http';
import process from 'process';
import { __Settings } from '../vars/__Settings.mjs';
import { __Env } from '../vars/__Env.mjs';
import { __QueueFIFO } from '../queue/__QueueFIFO.mjs';
import { _QueueObjectFIFO } from '@html_first/simple_queue';
import { FSRouter } from '../router/FSRouter.mjs';
import { __Response } from '../utils/__Response.mjs';
import { __Request } from '../utils/__Request.mjs';

export class __NodeServer {
	/**
	 * @type {__NodeServer}
	 */
	static __;
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
	/**
	 * @type {FSRouter}
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
		__QueueFIFO.__.assign(
			new _QueueObjectFIFO(async () => {
				new __Request(request);
				new __Response(response);
				this.fs_router = new FSRouter();
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
	start_server = () => {
		if (__Env.__._in_production) {
			this.listen_to_random_port();
		} else {
			this.listen_to_port();
		}
		const addres = this.server.address();
		if (addres) {
			// @ts-ignore
			console.log(`listen at: http://localhost:${addres.port}`);
		}
		process.on('exit', () => this.close_server());
		process.on('beforeExit', () => this.close_server());
		process.on('uncaughtException', () => this.close_server());
		process.on('SIGINT', () => this.close_server());
	};
	is_running = true;
	close_server = () => {
		if (!this.is_running) {
			return;
		}
		this.server.close();
		this.is_running = false;
		console.log('server closed');
	};
}
