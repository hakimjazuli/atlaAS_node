// @ts-check

import { statSync as stat_sync } from 'fs';
import { join as path_join } from 'path';
import { __Settings } from './__Settings.mjs';
import { __atlaAS } from './__atlaAS.mjs';
import { _FunctionHelpers } from './_FunctionHelpers.mjs';
import { _RouteWithMiddleware } from './_RouteWithMiddleware.mjs';
import { _Routes } from './_Routes.mjs';
import { _MapResources } from './_MapResources.mjs';
import { _RouteWithMapResourcesAndMiddleware } from './_RouteWithMapResourcesAndMiddleware.mjs';
import { _RouteWithMapResources } from './_RouteWithMapResources.mjs';
import { _FileServer } from './_FileServer.mjs';
import { _Middleware } from './_Middleware.mjs';
import { fsMiddleware } from './fsMiddleware.mjs';
import { mwInputs } from './mwInputs.export.mjs';

export class fsRouter extends fsMiddleware {
	constructor() {
		super();
	}
	run = async () => {
		const ret = await this.render();
		__atlaAS.__.end_(ret);
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
	 */
	handle_mw = async () => {
		const middleware_name = __Settings.__.middleware_name_;
		this.current_middleware = path_join(this.current_route, middleware_name);
		return await this.check_mw();
	};
	/**
	 * @param {boolean} is_real_route
	 */
	render = async (is_real_route = true) => {
		const __setting = __Settings.__;
		const uri_array = __atlaAS.__.request.atlaas_uri_array;
		this.request_length = uri_array.length;
		this.current_route = path_join(__atlaAS.__.app_root, __setting._routes_path);
		let routes_length = 0;
		if (
			!(await this.is_mw_allowed(
				/**
				 * I cannot think of any possible scenario where class `FSRouter` used as key for normal `this.current_route`, therefore it's safe to assume to use it;
				 */
				fsRouter,
				async () => await this.handle_mw()
			))
		) {
			return;
		}
		for (let i = 0; i < uri_array.length; i++) {
			const uri = uri_array[i];
			this.current_route = path_join(this.current_route, uri);
			if (
				i !== 0 &&
				!(await this.is_mw_allowed(this.current_route, async () => await this.handle_mw()))
			) {
				return;
			}
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
		const ret = await this.run_real_route(is_real_route);
		if (ret !== true) {
			return ret;
		}
	};
	/**
	 * @private
	 * @return {boolean}
	 */
	check_route = () => {
		try {
			const stats = stat_sync(`${this.current_route}${__Settings.__.route_mw_ext}`);
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
	 * @returns {Promise<boolean|string>}
	 */
	run_real_route = async (is_real_route) => {
		const route = this.real_route;
		const route_ref = await _FunctionHelpers.dynamic_import(route);
		if (!route_ref) {
			return false;
		}
		const route_instance = new route_ref(is_real_route);
		if (route_instance instanceof _Routes) {
			const atlaas = __atlaAS.__;
			atlaas.assign_query_param_to_class_property(route_instance);
			if (
				route_instance instanceof _RouteWithMiddleware &&
				!(await this.is_mw_allowed(route, async () => {
					return await route_instance.mw(mwInputs.mw_chain_helper);
				}))
			) {
				return false;
			}
			if (await this.check_is_map_resources_or_mw_blocked(route, route_instance)) {
				return true;
			}
			return await this.run_method_with_input_logic(route_instance);
		}
		return false;
	};
	/**
	 * @private
	 * @param {string} route_full_path
	 * @param {_Routes} route_instance
	 * @returns {Promise<boolean|string>}
	 * - if map_resources || mw_blocked then retrurns true;
	 */
	check_is_map_resources_or_mw_blocked = async (route_full_path, route_instance) => {
		const req = __atlaAS.__.request;
		if (!(route_instance instanceof _MapResources) || req.atlaas_method !== 'get') {
			return false;
		}
		const url_input = req.atlaas_uri_array.slice(this.routes_length);
		if (url_input.length === 0) {
			if (
				route_instance instanceof _RouteWithMapResourcesAndMiddleware &&
				!(await this.is_mw_allowed(route_full_path, async () => {
					return await route_instance.mw(mwInputs.mw_chain_helper);
				}))
			) {
				/**
				 * block from run_method_with_input_logic
				 */
				return true;
			}
			/**
			 * pass to run_method_with_input_logic
			 */
			return false;
		}
		if (
			!(route_instance instanceof _RouteWithMapResourcesAndMiddleware) ||
			(await this.is_mw_allowed(route_full_path, async () => {
				return await route_instance[__Settings.__.middleware_name_](
					mwInputs.mw_chain_helper
				);
			}))
		) {
			await route_instance.map_resources(...url_input);
			_FileServer.serves(url_input, route_full_path);
		}
		/**
		 * block from run_method_with_input_logic
		 */
		return true;
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
		const request = __atlaAS.__.request;
		const url_inputs = request.atlaas_uri_array.slice(-num_params);
		const method = request.atlaas_method;
		if (!(method in route_instance)) {
			__atlaAS.__.reroute_error(404);
			return;
		}
		const result = await route_instance[request.atlaas_method](...url_inputs);
		if (!result || !route_instance.is_real_route) {
			return result;
		}
		return result;
	};

	/**
	 * @public
	 * @type {null|Object.<string,string>}
	 */
	form_s_input_param = null;
}
