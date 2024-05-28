// @ts-check

import { statSync as stat_sync } from 'fs';
import { join as path_join } from 'path';
import { FSMiddleware } from '../middlewares/FSMiddleware.mjs';
import { __Request } from '../utils/__Request.mjs';
import { __Response } from '../utils/__Response.mjs';
import { __Settings } from '../vars/__Settings.mjs';
import { __atlaAS } from '../__atlaAS.mjs';
import { _FunctionHelpers } from '../utils/_FunctionHelpers.mjs';
import { _RouteWithMiddleware } from './_RouteWithMiddleware.mjs';
import { _Routes } from './_Routes.mjs';
import { _MapResources } from './_MapResources.mjs';
import { _RouteWithMapResourcesAndMiddleware } from './_RouteWithMapResourcesAndMiddleware.mjs';
import { _RouteWithMapResources } from './_RouteWithMapResources.mjs';
import { _FileServer } from '../utils/_FileServer.mjs';

export class FSRouter extends FSMiddleware {
	constructor() {
		super();
	}
	run = async () => {
		await this.render();
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
	render = async (is_real_route = true) => {
		const __setting = __Settings.__;
		const uri_array = __Request.__.uri_array;
		this.request_length = uri_array.length;
		this.current_route = path_join(__atlaAS.__.app_root, __setting._routes_path);
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
			__atlaAS.__.reroute_error(404);
			return;
		}
		await this.run_real_route(is_real_route);
	};
	/**
	 * @private
	 * @return {boolean}
	 */
	check_route = () => {
		try {
			const stats = stat_sync(`${this.current_route}.mjs`);
			if (!stats.isFile()) {
				return false;
			}
			this.real_route = this.current_route;
			return true;
		} catch (error) {
			return false;
		}
	};
	/**
	 * @private
	 * @param {boolean} is_real_route
	 */
	run_real_route = async (is_real_route) => {
		const route = this.real_route;
		const route_ref = await _FunctionHelpers.dynamic_import(route);
		const route_instance = new route_ref(is_real_route);
		if (route_instance instanceof _RouteWithMiddleware) {
			__atlaAS.__.assign_query_param_to_class_property(route_instance);
			route_instance.mw(__Request.__.method);
		}
		if (route_instance instanceof _Routes) {
			__atlaAS.__.assign_query_param_to_class_property(route_instance);
			if (await this.check_is_map_resources(route, route_instance)) {
				return;
			}
			await this.run_method_with_input_logic(route_instance);
		}
	};
	/**
	 * @private
	 * @param {_Routes} route_instance
	 */
	run_method_with_input_logic = async (route_instance) => {
		const num_params = _FunctionHelpers.url_input_length(route_instance);
		if (num_params !== this.request_length - this.routes_length) {
			__atlaAS.__.reroute_error(404);
			return;
		}
		const url_inputs = __Request.__.uri_array.slice(-num_params);
		const result = await route_instance[__Request.__.method](...url_inputs);
		if (result && route_instance.is_real_route) {
			__Response.__.response.end(result);
			return;
		}
		__Response.__.response.write(result);
	};
	/**
	 * @private
	 * @param {string} route_full_path
	 * @param {_Routes} route_instance
	 * @returns {Promise<boolean>}
	 */
	check_is_map_resources = async (route_full_path, route_instance) => {
		if (route_instance instanceof _MapResources && __Request.__.method === 'get') {
			const url_input = __Request.__.uri_array.slice(this.routes_length);
			if (url_input.length === 0) {
				if (route_instance instanceof _RouteWithMapResourcesAndMiddleware) {
					route_instance.mw('get');
					route_instance.get();
				} else if (route_instance instanceof _RouteWithMapResources) {
					route_instance.get();
				}
			} else {
				await route_instance.map_resources(...url_input);
				_FileServer.serves(url_input, route_full_path);
			}
			return true;
		}
		return false;
	};
}
