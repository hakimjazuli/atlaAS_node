// @ts-check

import { statSync as stat_sync } from 'fs';
import { join as path_join } from 'path';
import { FSMiddleware } from '../middlewares/FSMiddleware.mjs';
import { __Request } from '../utils/__Request.mjs';
import { __Response } from '../utils/__Response.mjs';
import { __Settings } from '../vars/__Settings.mjs';

export class __FSRouter extends FSMiddleware {
	/**
	 * @type {__FSRouter}
	 */
	static __;
	constructor() {
		super();
		if (__FSRouter.__ !== undefined) {
			return;
		}
		__FSRouter.__ = this;
	}
	/**
	 * @param {import('http').IncomingMessage} request
	 * @param {import('http').ServerResponse} response
	 */
	run = async (request, response) => {
		new __Request(request);
		new __Response(response);
		this.render();
	};
	/**
	 * @private
	 * @type {number}
	 */
	routes_length = 0;
	/**
	 * @private
	 * @type {object|string|false}
	 */
	real_route = false;
	/**
	 * @private
	 * @type {number}
	 */
	request_length = 0;
	/**
	 * @private
	 * @param {boolean} is_real_route
	 */
	render = (is_real_route = true) => {
		const __setting = __Settings.__;
		const uri_array = __Request.__.uri_array;
		this.request_length = uri_array.length;
		this.current_route = path_join(__setting.app_root, __setting._routes_path);
		let routes_length = 0;
		const middleware_name = __setting.middleware_name();
		for (let i = 0; i < uri_array.length; i++) {
			const uri = uri_array[i];
			this.current_route = path_join(this.current_route, uri);
			this.current_middleware = path_join(this.current_route, middleware_name);
			this.check_mw();
			routes_length++;
			if (this.check_route()) {
				this.routes_length = routes_length;
			} else if (!this.is_folder_exist()) {
				break;
			}
		}
		if (!this.real_route) {
			//     __atlaAS::reroute_error(404);
			return;
		}
		// $this->run_real_route($is_real_route);
	};
	/**
	 * @private
	 * @return {boolean}
	 */
	check_route = () => {
		try {
			const stats = stat_sync(this.current_middleware);
			if (!stats.isFile()) {
				return false;
			}
			this.real_route = this.current_route;
			return true;
		} catch (error) {
			return false;
		}
	};
}
