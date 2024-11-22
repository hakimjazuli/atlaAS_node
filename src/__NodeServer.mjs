// @ts-check

import os from 'os';
import http from 'http';
import process from 'process';
import { __Settings } from './__Settings.mjs';
import { __Env } from './__Env.mjs';
import { queueFIFO } from './queueFIFO.mjs';
import { _QueueObjectFIFO } from '@html_first/simple_queue';
import { fsRouter } from './fsRouter.mjs';
import { response_ as response_ } from './response_.mjs';
import { request_ } from './request_.mjs';
import { _FileServer } from './_FileServer.mjs';
import { __SQLite3 } from './__SQLite3.mjs';
import { __atlaAS } from './__atlaAS.mjs';

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
				__atlaAS.__.request = request_(request);
				__atlaAS.__.response = response_(response);
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
			const sqliteIntstance = __SQLite3.__;
			if (sqliteIntstance) {
				sqliteIntstance.log({
					context: 'server-start',
					message: JSON.stringify({
						nodeVersion: process.version,
						osType: os.type(),
						osRelease: os.release(),
						platform: process.platform,
						arch: process.arch,
						cpus: os.cpus(),
						memory: {
							totalMemory: os.totalmem(),
							freeMemory: os.freemem(),
						},
						environmentVariables: process.env,
						uptime: process.uptime(),
					}),
				});
			}
		}
		process.on('SIGINT', this.close_server);
		process.on('SIGTERM', this.close_server);
		process.on('exit', this.close_server);
		process.on('beforeExit', this.close_server);
		process.on('uncaughtException', this.close_server);
		process.on('unhandledRejection', this.close_server);
	};
	is_running = true;
	/**
	 * @param {...any} errors
	 */
	close_server = (...errors) => {
		try {
			this.server.close();
			const sqlite_instance = __SQLite3.__;
			if (sqlite_instance) {
				sqlite_instance.log({
					context: 'close-server',
					message: JSON.stringify({ ...errors }),
				});
			}
			console.log({ stats: 'server closed', ...errors });
			this.is_running = false;
			process.exit(0);
		} catch (error) {
			process.exit(0);
		}
	};
}
