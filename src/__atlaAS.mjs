// @ts-check

import he from 'he';
import { fileURLToPath } from 'url';
import path, { join as path_join } from 'path';
import { __QueueFIFO } from './queue/__QueueFIFO.mjs';
import { __NodeServer } from './server/__NodeServer.mjs';
import { __Request } from './utils/__Request.mjs';
import { __Response } from './utils/__Response.mjs';
import { __Settings } from './vars/__Settings.mjs';
import { _FunctionHelpers } from './utils/_FunctionHelpers.mjs';

export class __atlaAS {
	/**
	 * @type {__atlaAS}
	 */
	static __;
	/**
	 * @type {string}
	 */
	app_root;
	/**
	 * @param {typeof import('./vars/__Settings.mjs').__Settings} __settings
	 * @param {typeof import('./vars/__Env.mjs').__Env} __env
	 */
	constructor(__settings, __env) {
		if (__atlaAS.__ !== undefined) {
			return;
		}
		new __settings();
		new __env();
		if (__Settings.__._use_process_cwd_as_root) {
			this.app_root = process.cwd();
		} else {
			this.app_root = this.get_base(fileURLToPath(import.meta.url).replace('file://', ''));
		}
		new __QueueFIFO();
		new __NodeServer().start_server();
		__atlaAS.__ = this;
	}
	/**
	 * @private
	 * @param {string} curent__
	 * @returns {string}
	 */
	get_base = (curent__) => {
		const dir_name = path.dirname(curent__);
		const base_name = path.basename(dir_name);
		if (base_name == 'node_modules') {
			return path.dirname(dir_name);
		} else {
			return this.get_base(dir_name);
		}
	};
	/**
	 * @param {string} route_path
	 * @param {string[]} uri_input
	 * @param {Object.<string,string>} query_parameters
	 * @param {boolean} inherit_query_parameters
	 * @returns {Promise<any>}
	 */
	render_get = async (
		route_path,
		uri_input = [],
		query_parameters = {},
		inherit_query_parameters = true
	) => {
		const request = __Request.__;
		const uri_array = route_path
			.replace(__Settings.__._routes_path, '')
			.replace('//', '/')
			.replace(`.${__Settings.__._system_file[0]}`, '')
			.split('/')
			.filter((str) => str !== '');
		uri_array.push(...uri_input);
		if (inherit_query_parameters) {
			query_parameters = Object.assign(request.query_params_array, query_parameters);
		}
		const reseter = _FunctionHelpers.callable_collections(
			(() => {
				const temp_method = `${__Request.__.method}`;
				__Request.__.method = 'get';
				return () => (__Request.__.method = temp_method);
			})(),
			(() => {
				const temp_uri_array = [...__Request.__.uri_array];
				__Request.__.uri_array = uri_array;
				return () => (__Request.__.uri_array = temp_uri_array);
			})(),
			(() => {
				const temp_query_params_array = Object.assign({}, __Request.__.query_params_array);
				__Request.__.query_params_array = query_parameters;
				return () => (__Request.__.query_params_array = temp_query_params_array);
			})()
		);
		const result = await __NodeServer.__.fs_router.render(false);
		reseter();
		if (typeof result === 'string') {
			return result;
		}
	};
	/**
	 * @param {import('./router/_Routes.mjs')._Routes|
	 * import('./middlewares/_Middleware.mjs')._Middleware} class_instance
	 */
	assign_query_param_to_class_property = (class_instance) => {
		const query_param = __Request.__.query_params_array;
		for (const name in query_param) {
			const value = query_param[name];
			if (name in class_instance) {
				class_instance[name] = he.encode(value);
			}
		}
	};
	/**
	 * @param {string} location
	 * @param {string[]} url_input
	 * @param {boolean} use_client_side_routing
	 */
	reroute = (
		location,
		url_input = [],
		use_client_side_routing = false,
		message = 'you have been rerouted'
	) => {
		if (url_input.length >= 1) {
			location = path_join(location, ...url_input);
		}
		if (use_client_side_routing) {
			__Response.__.json().response.end(
				JSON.stringify({
					[__Settings.__._client_reroute_key]: location,
				})
			);
			return;
		}
		__Response.__.response.writeHead(302, /** code to reroute */ { location });
		__Response.__.response.end(message);
	};
	/**
	 * @param {number} code
	 * @param {boolean} use_client_side_routing
	 */
	reroute_error = (code = 404, use_client_side_routing = false) => {
		let message = '';
		switch (code) {
			case 403:
				message = 'HTTP/1.1 403 Forbidden';
				break;
			case 500:
				message = 'HTTP/1.0 500 Internal Server Error';
				break;
			case 404:
			default:
				code = 404;
				message = 'HTTP/1.0 404 Not Found';
				break;
		}
		this.reroute(
			path_join(__Settings.__._routes_errors_prefix, code.toString()),
			[],
			use_client_side_routing,
			message
		);
	};
	/**
	 * @param {string|((query_parameters:Object.<string,string>)=>(any|Promise<any>))} fallback string:
	 * - full path prefixed with '/';
	 * - ends with file extention too;
	 * @param {string[]} url_input
	 * - array input for get method arguments;
	 * @param {import('./utils/_FolloupParams.mjs')._FolloupParams[]} conditionals
	 * @param {Object.<string,string>} query_parameter
	 * @param {boolean} inherit_query_parameter rendered route will:
	 * - true:  inherit parent query parameter merged with $query_parameters;
	 * - false: use $query_parameters as new query parameters;
	 * @returns {Promise<boolean>}
	 * manually wrap this function call on if(!follow_up_params(..args)){
	 * 	return;
	 * }
	 */
	follow_up_params = async (
		fallback,
		url_input = [],
		conditionals = [],
		query_parameter = {},
		inherit_query_parameter = true
	) => {
		let match = true;
		for (let i = 0; i < conditionals.length; i++) {
			const { conditional, if_meet_merge } = conditionals[i];
			if (conditional) {
				continue;
			}
			Object.assign(query_parameter, if_meet_merge);
			match = false;
		}
		if (match) {
			return true;
		}
		if (typeof fallback === 'string') {
			const result = await __atlaAS.__.render_get(
				fallback,
				url_input,
				query_parameter,
				inherit_query_parameter
			);
			if (typeof result === 'string') {
				__Response.__.response.end(result);
			}
		} else {
			fallback(query_parameter);
		}
		return false;
	};
	/**
	 * @param {RegExp} regex
	 * @param {string} input_name
	 * - key of method parameter
	 */
	input_match = (regex, input_name) => {
		const __nodeserver = __NodeServer.__;
		if (__nodeserver.fs_router.form_s_input_param === null) {
			__nodeserver.fs_router.form_s_input_param = __Request.__.method_params();
		}
		return regex.test(__nodeserver.fs_router.form_s_input_param[input_name]);
	};
}
