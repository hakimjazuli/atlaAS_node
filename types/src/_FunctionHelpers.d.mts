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
    private static dynamic_import_cache;
    /**
     * @private
     * @param {string} path
     * @param {Object|null} [imported]
     * @returns {Promise<Object|null>}
     */
    private static resolve_dynamic_import;
    /**
     * @param {string} path
     * @returns {Promise<Object|null>}
     */
    static dynamic_import: (path: string) => Promise<any | null>;
    /**
     * @param {_Routes} class_instance
     * @returns {number}
     */
    static url_input_length: (class_instance: _Routes) => number;
    /**
     * @param {CallableFunction} callback
     */
    static is_async: (callback: CallableFunction) => boolean;
    /**
     * @param {string[][]} strings
     * @returns {string[]}
     */
    static merge_unique_1d_array: (...strings: string[][]) => string[];
    /**
     * @param {(()=>(Promise<any>|any))[]} functions
     * @returns {()=>Promise<any>}
     */
    static callable_collections: (...functions: (() => (Promise<any> | any))[]) => () => Promise<any>;
    /**
     * @param {(()=>(Promise<any>|any))[]} functions
     */
    static run_array_functions: (...functions: (() => (Promise<any> | any))[]) => Promise<void>;
}
import { _Routes } from './_Routes.mjs';
