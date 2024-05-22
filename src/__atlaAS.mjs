// @ts-check

import { __QueueFIFO } from './queue/__QueueFIFO.mjs';
import { __FSRouter } from './router/__FSRouter.mjs';
import { __NodeServer } from './server/__NodeServer.mjs';

export class __atlaAS {
	/**
	 * @type {__atlaAS}
	 */
	static __;
	/**
	 * Description
	 * @param {typeof import('./vars/__Settings.mjs').__Settings} __settings
	 * @param {typeof import('./vars/__Env.mjs').__Env} __env
	 */
	constructor(__settings, __env) {
		new __settings();
		new __env();
		new __FSRouter();
		new __QueueFIFO();
		new __NodeServer().start_server();
		__atlaAS.__ = this;
	}
}
