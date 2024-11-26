/**
 * * - returns true or awaited chains return value;
 * *
 */
export type mwMethod = (mode: typeof import("./mwInputs.export.mjs").mwInputs["mw_chain_helper"]) => Promise<boolean>;
/**
 * * - each of uri_input must never have default value;
 * *
 */
export type routeGetMethod = (...uri_inputs: string[]) => Promise<string>;
/**
 * * - each of uri_input must never have default value;
 * *[blank]/
 * ```
 */
export type routeMethod = (...uri_inputs: string[]) => Promise<void>;
export type __atlaAS_ = import("./__atlaAS.mjs").__atlaAS;
export type standard_mw_ = (req: __atlaAS_["request"], res: __atlaAS_["response"], next: (pass_message?: any) => any) => (void | Promise<void>);
export type read_error_ = (err: any, req: __atlaAS_["request"], res: __atlaAS_["response"], next: (pass_message?: any) => any) => (void | Promise<void>);
