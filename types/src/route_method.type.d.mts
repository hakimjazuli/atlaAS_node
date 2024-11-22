export type standard_mw_ = (req: __atlaAS["request"], res: __atlaAS["response"], next: (pass_message?: any) => any) => (void | Promise<void>);
export type read_error_ = (err: any, req: __atlaAS["request"], res: __atlaAS["response"], next: (pass_message?: any) => any) => (void | Promise<void>);
/**
 * * - returns true or awaited chains return value;
 * *
 */
export type mw_method = (mode: {
    mw: (callback: standard_mw_) => standard_mw_;
    mw_err: (callback: read_error_) => read_error_;
    chains: (...middlewares: (standard_mw_ | read_error_)[]) => Promise<boolean>;
}) => Promise<boolean>;
/**
 * * - each of uri_input must never have default value;
 * *
 */
export type route_get_method = (...uri_inputs: string[]) => Promise<string>;
/**
 * * - each of uri_input must never have default value;
 * *[blank]/
 * ```
 */
export type route_method = (...uri_inputs: string[]) => Promise<void>;
import { __atlaAS } from './__atlaAS.mjs';
