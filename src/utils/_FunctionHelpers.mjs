// @ts-check

import { _Routes } from '../router/_Routes.mjs';
import { __Settings } from '../vars/__Settings.mjs';
import { __Request } from './__Request.mjs';

export class _FunctionHelpers {
	/**
	 * @param {string} path
	 * @returns {Promise<Object|null>}
	 */
	static dynamic_import = async (path) => {
		const system_files = __Settings.__._system_file;
		for (let i = 0; i < system_files.length; i++) {
			const extention = system_files[i];
			path = `${path}.${extention}`;
			const result = await import(path).catch(async () => {
				return await import(`file://${path}`).catch((err) => null);
			});
			if (result) {
				return result.default;
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
	// public static function url_input_length(string $class_name, string $method_name): int {
	//     $reflection = new ReflectionMethod($class_name, $method_name);
	//     return $reflection->getNumberOfParameters();
	// }
}
