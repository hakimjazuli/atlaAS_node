// @ts-check

import { join as path_join } from 'path';
import { __atlaAS } from '../__atlaAS.mjs';
import { _Routes } from '../router/_Routes.mjs';
import { __Settings } from '../vars/__Settings.mjs';
import { __Request } from './__Request.mjs';

const dynamic_import_cache = {};

export class _FunctionHelpers {
	/**
	 * @param {string} path
	 * @returns {Promise<Object|null>}
	 */
	static dynamic_import = async (path) => {
		if (dynamic_import_cache[path]) {
			return dynamic_import_cache[path];
		}
		if (__atlaAS.__._route_list) {
			const route_path = path
				.replace(path_join(__atlaAS.__.app_root, __Settings.__._routes_path) + '\\', '')
				.replace(/\\/g, '/');
			if (__atlaAS.__._route_list[route_path]) {
				return (dynamic_import_cache[path] = __atlaAS.__._route_list[route_path]);
			}
		}
		const system_files = __Settings.__._system_file;
		for (let i = 0; i < system_files.length; i++) {
			const extention = system_files[i];
			path = `${path}.${extention}`;
			const result = await import(path).catch(async () => {
				return await import(`file://${path}`).catch((err) => null);
			});
			if (result) {
				return (dynamic_import_cache[path] = result.default);
			}
		}
		return null;
	};
	/**
	 * @param {_Routes} class_instance
	 * @returns {number}
	 */
	static url_input_length = (class_instance) => {
		return class_instance[__Request.__.method].length;
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
