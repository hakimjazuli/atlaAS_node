// @ts-check

import { __atlaAS } from './__atlaAS.mjs';
import { mwInputs } from './mwInputs.export.mjs';

/**
 * @typedef {(req: __atlaAS["request"], res: __atlaAS["response"], next: (pass_message?: any) => any) => (void|Promise<void>)} standard_mw_
 * @typedef {(err:any, req: __atlaAS["request"], res: __atlaAS["response"], next: (pass_message?: any) => any) =>(void|Promise<void>)} read_error_
 */
/**
 * @description
 * type helper for route_method
 * ```js
 * /**
 *  * @typedef {(mode:mwInputs.mw_chain_helper)=>Promise<boolean>} mw_method
 *  * - returns true or awaited chains return value;
 *  * @typedef {(...uri_inputs:string[])=>Promise<string>} route_get_method
 *  * - each of uri_input must never have default value;
 *  * @typedef {(...uri_inputs:string[])=>Promise<void>} route_method
 *  * - each of uri_input must never have default value;
 *  *[blank]/
 * ```
 */
