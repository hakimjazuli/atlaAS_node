export { html } from "./src/html.export.mjs";
export { htmlReturn } from "./src/htmlReturn.export.mjs";
export { mwInputs } from "./src/mwInputs.export.mjs";
export { req } from "./src/req.export.mjs";
export { res } from "./src/res.export.mjs";
export { _AppRegex } from "./src/_AppRegex.mjs";
export { _Cors } from "./src/_Cors.mjs";
export { _FileServer } from "./src/_FileServer.mjs";
export { _FollowUpParams } from "./src/_FollowUpParams.mjs";
export { _FunctionHelpers } from "./src/_FunctionHelpers.mjs";
export { _MapResources } from "./src/_MapResources.mjs";
export { _Middleware } from "./src/_Middleware.mjs";
export { _Routes } from "./src/_Routes.mjs";
export { _RouteWithMapResources } from "./src/_RouteWithMapResources.mjs";
export { _RouteWithMapResourcesAndMiddleware } from "./src/_RouteWithMapResourcesAndMiddleware.mjs";
export { _RouteWithMiddleware } from "./src/_RouteWithMiddleware.mjs";
export { __atlaAS } from "./src/__atlaAS.mjs";
export { __Env } from "./src/__Env.mjs";
export { __NodeServer } from "./src/__NodeServer.mjs";
export { __Settings } from "./src/__Settings.mjs";
export { __SQLite3 } from "./src/__SQLite3.mjs";
/**
 * * - returns true or awaited chains return value;
 * *
 */
export type mwMethod = (mode: typeof import("./src/mwInputs.export.mjs").mwInputs["mw_chain_helper"]) => Promise<boolean>;
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
export type __atlaAS_ = import("./src/__atlaAS.mjs").__atlaAS;
export type standard_mw_ = (req: __atlaAS_["request"], res: __atlaAS_["response"], next: (pass_message?: any) => any) => (void | Promise<void>);
export type read_error_ = (err: any, req: __atlaAS_["request"], res: __atlaAS_["response"], next: (pass_message?: any) => any) => (void | Promise<void>);
