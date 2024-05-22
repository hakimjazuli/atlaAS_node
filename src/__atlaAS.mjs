// @ts-check

import { __QueueFIFO } from './queue/__QueueFIFO.mjs';
import { __NodeServer } from './server/__NodeServer.mjs';

export class __atlaAS {
	/**
	 * @type {__atlaAS}
	 */
	static __;
	/**
	 * Description
	 * @param {typeof import('./vars/__AppSettings.mjs').__AppSettings} __app_settings
	 * @param {typeof import('./vars/__Env.mjs').__Env} __env
	 */
	constructor(__app_settings, __env) {
		new __app_settings();
		new __env();
		new __QueueFIFO();
		new __NodeServer();
		__atlaAS.__ = this;
	}
}
