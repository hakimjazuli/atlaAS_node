// @ts-check

import he from 'he';
import { join as path_join } from 'path';
import { __QueueFIFO } from './queue/__QueueFIFO.mjs';
import { __NodeServer } from './server/__NodeServer.mjs';
import { __Request } from './utils/__Request.mjs';
import { __Response } from './utils/__Response.mjs';
import { __Settings } from './vars/__Settings.mjs';

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
		if (__atlaAS.__ !== undefined) {
			return;
		}
		new __settings();
		new __env();
		new __QueueFIFO();
		new __NodeServer().start_server();
		__atlaAS.__ = this;
	}
	/**
	 * @param {import('./router/_Routes.mjs')._Routes|
	 * import('./middlewares/_Middleware.mjs')._Middleware} class_instance
	 */
	assign_query_param_to_class_property = (class_instance) => {
		const query_param = __Request.__.query_params_arrray;
		for (const name in query_param) {
			const value = query_param[name];
			if (name in class_instance) {
				class_instance[name] = he.encode(value);
			}
		}
	};
	/**
	 * @param {string} path
	 * @param {string[]} url_input
	 * @param {boolean} use_client_side_routing
	 */
	reroute = (path, url_input = [], use_client_side_routing = false) => {
		if (url_input.length >= 1) {
			path = path_join(path, ...url_input);
		}
		if (use_client_side_routing) {
			__Response.__.json().response.end(
				JSON.stringify({
					[__Settings.__._client_reroute_key]: path,
				})
			);
		}
		__Response.__.response.end(() => {
			__Response.__.response.setHeader('location', path);
		});
	};
	/**
	 * @param {number} code
	 */
	reroute_error = (code = 404) => {
		switch (code) {
			case 403:
			case 404:
			case 500:
				break;
			default:
				code = 404;
				break;
		}
		this.set_error_header(code);
		this.reroute(`${__Settings.__._routes_errors_prefix}${code}`);
	};
	/**
	 * @param {number} code
	 */
	set_error_header = (code = 404) => {
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
		__Response.__.response.statusCode = code;
		__Response.__.response.statusMessage = message;
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
