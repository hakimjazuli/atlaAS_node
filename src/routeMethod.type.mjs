// @ts-check

import { __atlaAS } from './__atlaAS.mjs';
import { mwInputs } from './mwInputs.export.mjs';

/**
 * @typedef {(req: __atlaAS["request"], res: __atlaAS["response"], next: (pass_message?: any) => any) => (void|Promise<void>)} standard_mw_
 * @typedef {(err:any, req: __atlaAS["request"], res: __atlaAS["response"], next: (pass_message?: any) => any) =>(void|Promise<void>)} read_error_
 */
/**
 * @description
 * type helper for routeMethod
 * ```js
 * /**
 *  * @typedef {(mode:mwInputs.mw_chain_helper)=>Promise<boolean>} mwMethod
 *  * - returns true or awaited chains return value;
 *  * @typedef {(...uri_inputs:string[])=>Promise<string>} routeGetMethod
 *  * - each of uri_input must never have default value;
 *  * @typedef {(...uri_inputs:string[])=>Promise<void>} routeMethod
 *  * - each of uri_input must never have default value;
 *  *[blank]/
 * ```
 */
