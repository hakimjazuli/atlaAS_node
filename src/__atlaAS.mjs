// @ts-check

import he from 'he';
import { fileURLToPath } from 'url';
import path, { join as path_join } from 'path';
import { queueFIFO } from './queueFIFO.mjs';
import { __NodeServer } from './__NodeServer.mjs';
import { __Request } from './__Request.mjs';
import { __Response } from './__Response.mjs';
import { __Settings } from './__Settings.mjs';
import { _FunctionHelpers } from './_FunctionHelpers.mjs';

/**
 * @description
 * - is a [singleton](#singleton)
 * - use this class to instantiate the server
 * ```js
 * // /backend/atlaAS.mjs
 * new __atlaAS({
 * 	settings: __Settings, // extends from [__Settings](#__settings)
 * 	env: __Env, // extends from [__Env](#__env)
 * 	...options
 * });
 * ```
 * - call using bun or node
 * ```shell
 * bun --watch ./backend/atlaAS.mjs
 * npm run ./backend/atlaAS.mjs -- --watch
 * ```
 * - it's recomended to save the script on the package.json for convenience
 */
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
	 * @private
	 * @param {number} port
	 * @returns {boolean}
	 */
	static is_valid_port = (port) => {
		return Number.isInteger(port) && port >= 0 && port <= 65535;
	};
	/**
	 * @param {Object} a0
	 * @param {typeof import('./__Settings.mjs').__Settings} a0.settings
	 * @param {typeof import('./__Env.mjs').__Env} a0.env
	 * @param {number} [a0.overwrite_port]
	 * - undefined: dynamic route call;
	 * - _RouteList: allow for bundling, make sure to overwrite __Settings._base_identifier to uppermost dir name of the bundled file(before root);
	 */
	constructor({ settings, env, overwrite_port = undefined }) {
		if (__atlaAS.__ !== undefined) {
			return;
		}
		__atlaAS.__ = this;
		new settings();
		new env();
		if (overwrite_port) {
			__Settings.__._default_port = overwrite_port;
		}
		if (__Settings.__._use_process_cwd_as_root) {
			this.app_root = process.cwd();
		} else {
			this.app_root = this.get_base(fileURLToPath(import.meta.url).replace('file://', ''));
		}
		new queueFIFO();
		if (overwrite_port && __atlaAS.is_valid_port(overwrite_port)) {
			__Settings.__._default_port = overwrite_port;
		}
		new __NodeServer().start_server(overwrite_port);
	}
	/**
	 * @private
	 * @param {string} curent__
	 * @returns {string}
	 */
	get_base = (curent__) => {
		const dir_name = path.dirname(curent__);
		const base_name = path.basename(dir_name);
		if (base_name == __Settings.__._base_identifier) {
			return path.dirname(dir_name);
		} else {
			return this.get_base(dir_name);
		}
	};
	/**
	 * @param {string} route_path
	 * - project absoulte path to the route
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
	 * @param {import('./_Routes.mjs')._Routes|
	 * import('./_Middleware.mjs')._Middleware} class_instance
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
		location = location
			.replace('/index', '/')
			.replace(`.${__Settings.__._system_file[0]}`, '')
			.replace(__Settings.__._routes_path, '')
			.replace(/\/+/g, '/');
		if (url_input.length >= 1) {
			location = path_join(location, ...url_input);
		}
		if (use_client_side_routing) {
			__Response.__.json().end(
				JSON.stringify({
					[__Settings.__._client_reroute_key]: location,
				})
			);
			return;
		}
		const req = __Request.__.request;
		const host = req.headers.host || `${req.socket.localAddress}:${req.socket.localPort}`;
		const protocol = req.headers['x-forwarded-proto'] || 'http';
		location = `${protocol}://${path_join(host ?? '', location)}`;
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
	 * @param {import('./_FollowUpParams.mjs')._FollowUpParams[]} conditionals
	 * @param {Object.<string,string>} query_parameter
	 * @param {boolean} inherit_query_parameter rendered route will:
	 * - true:  inherit parent query parameter merged with $query_parameters;
	 * - false: use $query_parameters as new query parameters;
	 * @returns {Promise<boolean>}
	 * manually wrap this function call on if(!validate_params(..args)){
	 * 	return;
	 * }
	 */
	validate_params = async (
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
