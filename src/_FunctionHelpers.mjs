// @ts-check

import { __atlaAS } from './__atlaAS.mjs';
import { _Routes } from './_Routes.mjs';
import { __Settings } from './__Settings.mjs';
import { fileURLToPath } from 'url';

/**
 * @description
 * - is a [helper class](#helper_class);
 * - collection of static methods, originally used for library internals functionality, but it might be usefull for general uses;
 */
export class _FunctionHelpers {
	/**
	 * @private
	 * @type {Map<string, Object|null>}
	 */
	static dynamic_import_cache = new Map();
	/**
	 * @private
	 * @param {string} path
	 * @param {Object|null} [imported]
	 * @returns {Promise<Object|null>}
	 */
	static resolve_dynamic_import = (path, imported = null) => {
		if (!__Settings.__._allow_routes_caching) {
			return imported;
		}
		_FunctionHelpers.dynamic_import_cache.set(path, imported);
		return imported;
	};
	/**
	 * @param {string} path_
	 * @returns {Promise<Object|null>}
	 */
	static dynamic_import = async (path_) => {
		let logged_path = path_;
		const route_mw_ext = __Settings.__.route_mw_ext;
		if (!logged_path.endsWith(route_mw_ext)) {
			logged_path = `${logged_path}${route_mw_ext}`;
		}
		const ref = _FunctionHelpers.dynamic_import_cache.get(logged_path);
		if (ref) {
			return _FunctionHelpers.resolve_dynamic_import(logged_path, ref);
		}
		const extention = __Settings.__._system_file;
		path_ = `${path_}.${extention}`;
		let result;
		try {
			result = await import(fileURLToPath(path_));
		} catch (_) {
			try {
				result = await import(fileURLToPath(`file://${path_}`));
			} catch (_) {
				return null;
			}
		}
		if (result) {
			return _FunctionHelpers.resolve_dynamic_import(path_, result.default);
		}
		return null;
	};
	/**
	 * @param {_Routes} class_instance
	 * @returns {number}
	 */
	static url_input_length = (class_instance) => {
		return class_instance[__atlaAS.__.request.atlaas_method].length;
	};
	/**
	 * @param {CallableFunction} callback
	 */
	static is_async = (callback) => callback.constructor.name === 'AsyncFunction';
	/**
	 * @param {string[][]} strings
	 * @returns {string[]}
	 */
	static merge_unique_1d_array = (...strings) => {
		const mergedArray = strings.reduce((result, arr) => result.concat(arr), []);
		const uniqueArray = [...new Set(mergedArray)];
		return uniqueArray;
	};
	/**
	 * @param {(()=>(Promise<any>|any))[]} functions
	 * @returns {()=>Promise<any>}
	 */
	static callable_collections = (...functions) => {
		return async () => await _FunctionHelpers.run_array_functions(...functions);
	};
	/**
	 * @param {(()=>(Promise<any>|any))[]} functions
	 */
	static run_array_functions = async (...functions) => {
		for (let i = 0; i < functions.length; i++) {
			const function_ = functions[i];
			if (!_FunctionHelpers.is_async(function_)) {
				function_();
				return;
			}
			await function_();
		}
	};
}
