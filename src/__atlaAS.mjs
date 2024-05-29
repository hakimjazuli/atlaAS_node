// @ts-check

import he from 'he';
import { join as path_join } from 'path';
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
	 * Description
	 * @param {typeof import('./vars/__Settings.mjs').__Settings} __settings
	 * @param {typeof import('./vars/__Env.mjs').__Env} __env
	 */
	constructor(__settings, __env) {
		if (__atlaAS.__ !== undefined) {
			return;
		}
		this.app_root = process.cwd();
		new __settings();
		new __env();
		new __QueueFIFO();
		new __NodeServer().start_server();
		__atlaAS.__ = this;
	}

	//  /**
	//  * render_get
	//  *
	//  * @param  null|array $class_ref_and_uri_input
	//  * - null: use the same __Request::uri_array where this method is called;
	//  * - array: [class_ref::class, ...$arguments_for_the_class_get_method];
	//  * @param  array $query_parameters
	//  * - associative array, assigned to route class property if any (for best practice);
	//  * @param  bool $inherit_query_parameters
	//  * - rendered route will:
	//  * >- true:  inherit parent query parameter merge with $query_parameters;
	//  * >- false: use $query_parameters as new query parameters;
	//  * @return void
	//  */
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
	reroute = (location, url_input = [], use_client_side_routing = false) => {
		if (url_input.length >= 1) {
			location = path_join(location, ...url_input);
		}
		if (use_client_side_routing) {
			__Response.__.json().response.end(
				JSON.stringify({
					[__Settings.__._client_reroute_key]: location,
				})
			);
		}
		__Response.__.response.writeHead(200, { location });
		__Response.__.response.end();
	};
	/**
	 * @param {number} code
	 */
	reroute_error = (code = 404) => {
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
		__Response.__.response.writeHead(302 /** code to reroute */, {
			location: path_join(__Settings.__._routes_errors_prefix, code.toString()),
		});
		__Response.__.response.end(message);
	};
	/**
	 * @param {string[]|(()=>(any|Promise<any>))} fallback
	 * @param {import('./utils/_FolloupParams.mjs')._FolloupParams[]} conditionals
	 * @param {Object.<string,string>} query_parameter
	 * @param {boolean} inherit_query_parameter
	 */
	follow_up_params = (
		fallback,
		conditionals,
		query_parameter = {},
		inherit_query_parameter = true
	) => {
		// public static function follow_up_params(
		// 	array|callable $fallback,
		// 	array $conditionals,
		// 	array $query_parameter = [],
		// 	bool $inherit_query_parameter = true
		// ): void {
		// 	$match = true;
		// 	foreach ($conditionals as $data) {
		// 		[$conditional, $if_meet_merge] = $data;
		// 		if (!$conditional) {
		// 			$query_parameter = \array_merge($query_parameter, $if_meet_merge);
		// 			$match = false;
		// 		}
		// 	}
		// 	if (!$match) {
		// 		if (\is_array($fallback)) {
		// 			__atlaAS::render_get($fallback, $query_parameter, $inherit_query_parameter);
		// 		} else {
		// 			$fallback($query_parameter);
		// 		}
		// 		exit(0);
		// 	}
		// }
	};
}
