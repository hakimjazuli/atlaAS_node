// @ts-check

import he from 'he';
import { fileURLToPath } from 'url';
import path, { join as path_join } from 'path';
import { queueFIFO } from './queueFIFO.mjs';
import { __NodeServer } from './__NodeServer.mjs';
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
 * 	sqlite3: __Sqlite3, // extends from [__Sqlite3](#__sqlite3)
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
	 * @param {any} val
	 */
	end_ = (val) => {
		if (this.response.do_not_response_with_end) {
			return;
		}
		this.response.do_not_response_with_end = true;
		if (val === true) {
			val = undefined;
		}
		if (val) {
			this.response.end(val);
		}
	};
	/**
	 * @param {Object} a0
	 * @param {typeof import('./__Settings.mjs').__Settings} a0.settings
	 * @param {typeof import('./__Env.mjs').__Env} a0.env
	 * @param {typeof import('./__SQLite3.mjs').__SQLite3} [a0.sqlite3]
	 * @param {number} [a0.overwrite_port]
	 * - undefined: dynamic route call;
	 * - _RouteList: allow for bundling, make sure to overwrite __Settings._base_identifier to uppermost dir name of the bundled file(before root);
	 */
	constructor({ settings, env, sqlite3, overwrite_port = undefined }) {
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
			this.app_root = this.get_base(fileURLToPath(import.meta.url));
		}
		if (sqlite3) {
			new sqlite3();
		}
		new queueFIFO();
		if (overwrite_port && __atlaAS.is_valid_port(overwrite_port)) {
			__Settings.__._default_port = overwrite_port;
		}
		new __NodeServer().start_server(overwrite_port);
	}
	/**
	 * @type {any}
	 */
	current_error;
	/**
	 * @type {ReturnType<import('./request_.mjs').request_>}
	 */
	request;
	/**
	 * @type {ReturnType<import('./response_.mjs').response_>}
	 */
	response;
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
		const uri_array = route_path
			.replace(__Settings.__._routes_path, '')
			.replace('//', '/')
			.replace(`.${__Settings.__._system_file}`, '')
			.split('/')
			.filter((str) => str !== '');
		uri_array.push(...uri_input);
		const request = this.request;
		if (inherit_query_parameters) {
			query_parameters = Object.assign(
				request.atlaas_query_params_object ?? {},
				query_parameters
			);
		}
		const reseter = _FunctionHelpers.callable_collections(
			(() => {
				const temp_method = `${
					/**
					 *  to make sure it's copying the value instead of the reference
					 */
					request.atlaas_method
				}`;
				request.atlaas_method = 'get';
				return () => (request.atlaas_method = temp_method);
			})(),
			(() => {
				const temp_uri_array = [
					/**
					 *  to make sure it's copying the value instead of the reference
					 */
					...request.atlaas_uri_array,
				];
				request.atlaas_uri_array = uri_array;
				return () => (request.atlaas_uri_array = temp_uri_array);
			})(),
			(() => {
				const temp_query_params_array = Object.assign(
					/**
					 *  to make sure it's copying the value instead of the reference
					 */
					{},
					request.atlaas_query_params_object
				);
				request.atlaas_query_params_object = query_parameters;
				return () => (request.atlaas_query_params_object = temp_query_params_array);
			})()
		);
		const result = await __NodeServer.__.fs_router.render(false);
		reseter();
		return result;
	};
	/**
	 * @param {import('./_Routes.mjs')._Routes|
	 * import('./_Middleware.mjs')._Middleware} class_instance
	 */
	assign_query_param_to_class_property = (class_instance) => {
		const query_param = this.request.atlaas_query_params_object;
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
			.replace(`.${__Settings.__._system_file}`, '')
			.replace(__Settings.__._routes_path, '')
			.replace(/\/+/g, '/');
		if (url_input.length >= 1) {
			location = path_join(location, ...url_input);
		}
		const response = __atlaAS.__.response;
		if (use_client_side_routing) {
			response.atlaas_json();
			this.end_(
				JSON.stringify({
					[__Settings.__._client_reroute_key]: location,
				})
			);
			return;
		}
		const requset = this.request;
		const host =
			requset.headers.host || `${requset.socket.localAddress}:${requset.socket.localPort}`;
		const protocol = requset.headers['x-forwarded-proto'] || 'http';
		location = `${protocol}://${path_join(host ?? '', location)}`;
		response.writeHead(302, /** code to reroute */ { location });
		this.end_(message);
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
				this.end_(result);
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
			__nodeserver.fs_router.form_s_input_param = this.request.atlaas_method_params();
		}
		return regex.test(__nodeserver.fs_router.form_s_input_param[input_name]);
	};
}
