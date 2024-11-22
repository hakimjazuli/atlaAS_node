// @ts-check

/**
 * generated using:
 * @see {@link https://www.npmjs.com/package/@html_first/js_lib_template | @html_first/js_lib_template}
 * @copyright
 * this library is developed and published under MIT license
 * @description
 * # atlaAS_node
 * an `FSRouting` for `nodeJS` and `bun`, ported the logic from [atlaAS](https://github.com/hakimjazuli/atlaAS)
 * ## how to install
 * ```shell
 * npm i @html_first/atla-as_node
 * ```
 * ## how to initialize
 * - initialize using [__atlaAS instance](#__atlaas)
 * ## problem with porting
 * php have wide range of built in connection class using `PDO` which also already highly used as the goto solution in php environtment:
 * - however in `nodeJS`, there's high chances connection library will be different per project, therefore atlaAS `connection` and `querying` functionality WILL NOT be implemented in this `port`, as in EVER;
 * ## recomendations
 * you might need to install extentions/linters to help you with the `html` template literals
 * - for vscode we found this either one of these helped a lot:
 * > - [lit-html](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html)
 * > - [vscode-template-literal-editor](https://marketplace.visualstudio.com/items?itemName=plievone.vscode-template-literal-editor)
 * ## class_helper
 * - any class prefixed with "_" are a helper class;
 * - it contains methods or constructor to help you in common scenarios;
 * ## singleton
 * - any class prefixed with "__" are singleton, the instance can be accessed from `_Routes[anyMethods]` via class static property `ClassName.__`
 * ## setting_class
 * - extends the class and modify the property which are prefixed with "_" if neccessary
 */

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

export { html, htmlReturn, mwInputs, req, res, _AppRegex, _Cors, _FileServer, _FollowUpParams, _FunctionHelpers, _MapResources, _Middleware, _Routes, _RouteWithMapResources, _RouteWithMapResourcesAndMiddleware, _RouteWithMiddleware, __atlaAS, __Env, __NodeServer, __Settings, __SQLite3 };