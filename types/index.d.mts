export type standard_mw_ = (req: __atlaAS["request"], res: __atlaAS["response"], next: (pass_message?: any) => any) => (void | Promise<void>);
export type read_error_ = (err: any, req: __atlaAS["request"], res: __atlaAS["response"], next: (pass_message?: any) => any) => (void | Promise<void>);
/**
 * * - returns true or awaited chains return value;
 * *
 */
export type mw_method = (mode: {
    mw: (callback: import("./src/route_method.type.mjs").standard_mw_) => import("./src/route_method.type.mjs").standard_mw_;
    mw_err: (callback: import("./src/route_method.type.mjs").read_error_) => import("./src/route_method.type.mjs").read_error_;
    chains: (...middlewares: (import("./src/route_method.type.mjs").standard_mw_ | import("./src/route_method.type.mjs").read_error_)[]) => Promise<boolean>;
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
import { html } from './src/html.export.mjs';
import { htmlReturn } from './src/htmlReturn.export.mjs';
import { mwInputs } from './src/mwInputs.export.mjs';
import { req } from './src/req.export.mjs';
import { res } from './src/res.export.mjs';
import { _AppRegex } from './src/_AppRegex.mjs';
import { _Cors } from './src/_Cors.mjs';
import { _FileServer } from './src/_FileServer.mjs';
import { _FollowUpParams } from './src/_FollowUpParams.mjs';
import { _FunctionHelpers } from './src/_FunctionHelpers.mjs';
import { _MapResources } from './src/_MapResources.mjs';
import { _Middleware } from './src/_Middleware.mjs';
import { _Routes } from './src/_Routes.mjs';
import { _RouteWithMapResources } from './src/_RouteWithMapResources.mjs';
import { _RouteWithMapResourcesAndMiddleware } from './src/_RouteWithMapResourcesAndMiddleware.mjs';
import { _RouteWithMiddleware } from './src/_RouteWithMiddleware.mjs';
import { __atlaAS } from './src/__atlaAS.mjs';
import { __Env } from './src/__Env.mjs';
import { __NodeServer } from './src/__NodeServer.mjs';
import { __Settings } from './src/__Settings.mjs';
import { __SQLite3 } from './src/__SQLite3.mjs';
export { html, htmlReturn, mwInputs, req, res, _AppRegex, _Cors, _FileServer, _FollowUpParams, _FunctionHelpers, _MapResources, _Middleware, _Routes, _RouteWithMapResources, _RouteWithMapResourcesAndMiddleware, _RouteWithMiddleware, __atlaAS, __Env, __NodeServer, __Settings, __SQLite3 };
