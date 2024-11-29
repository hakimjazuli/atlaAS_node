// @ts-check

/**
 * @description
 * type helper for routeMethod
 * ```js
 * /**
 *  * @typedef {(mode:typeof import('./mwInputs.export.mjs').mwInputs["mw_chain_helper"])=>Promise<boolean>} mwMethod
 *  * - returns true or awaited chains return value;
 *  * @typedef {(...uri_inputs:string[])=>Promise<string>} routeGetMethod
 *  * - each of uri_input must never have default value;
 *  * @typedef {(...uri_inputs:string[])=>Promise<void>} routeMethod
 *  * - each of uri_input must never have default value;
 *  *[blank]/
 * ```
 * @typedef {import('./__atlaAS.mjs').__atlaAS} __atlaAS_
 * @typedef {(req: __atlaAS_["request"], res: __atlaAS_["response"], next: (pass_message?: any) => any) => (void|Promise<void>)} standard_mw_
 * @typedef {(err:any, req: __atlaAS_["request"], res: __atlaAS_["response"], next: (pass_message?: any) => any) =>(void|Promise<void>)} read_error_
 */
