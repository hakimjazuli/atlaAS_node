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
 */

import { html } from './src/html.export.mjs';
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
import { _SQLiteRateLimiter } from './src/_SQLiteRateLimiter.mjs';
import { __atlaAS } from './src/__atlaAS.mjs';
import { __Env } from './src/__Env.mjs';
import { __NodeServer } from './src/__NodeServer.mjs';
import { __Request } from './src/__Request.mjs';
import { __Response } from './src/__Response.mjs';
import { __Settings } from './src/__Settings.mjs';
export { html, _AppRegex, _Cors, _FileServer, _FollowUpParams, _FunctionHelpers, _MapResources, _Middleware, _Routes, _RouteWithMapResources, _RouteWithMapResourcesAndMiddleware, _RouteWithMiddleware, _SQLiteRateLimiter, __atlaAS, __Env, __NodeServer, __Request, __Response, __Settings };