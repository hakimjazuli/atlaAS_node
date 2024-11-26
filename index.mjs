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
export { html } from './src/html.export.mjs';
export { htmlReturn } from './src/htmlReturn.export.mjs';
export { mwInputs } from './src/mwInputs.export.mjs';
export { req } from './src/req.export.mjs';
export { res } from './src/res.export.mjs';
export { _AppRegex } from './src/_AppRegex.mjs';
export { _Cors } from './src/_Cors.mjs';
export { _FileServer } from './src/_FileServer.mjs';
export { _FollowUpParams } from './src/_FollowUpParams.mjs';
export { _FunctionHelpers } from './src/_FunctionHelpers.mjs';
export { _MapResources } from './src/_MapResources.mjs';
export { _Middleware } from './src/_Middleware.mjs';
export { _Routes } from './src/_Routes.mjs';
export { _RouteWithMapResources } from './src/_RouteWithMapResources.mjs';
export { _RouteWithMapResourcesAndMiddleware } from './src/_RouteWithMapResourcesAndMiddleware.mjs';
export { _RouteWithMiddleware } from './src/_RouteWithMiddleware.mjs';
export { __atlaAS } from './src/__atlaAS.mjs';
export { __Env } from './src/__Env.mjs';
export { __NodeServer } from './src/__NodeServer.mjs';
export { __Settings } from './src/__Settings.mjs';
export { __SQLite3 } from './src/__SQLite3.mjs';
/**
 * @description
 * type helper for routeMethod
 * ```js
 * /**
 *  * @typedef {(mode:typeof import('./src/mwInputs.export.mjs').mwInputs["mw_chain_helper"])=>Promise<boolean>} mwMethod
 *  * - returns true or awaited chains return value;
 *  * @typedef {(...uri_inputs:string[])=>Promise<string>} routeGetMethod
 *  * - each of uri_input must never have default value;
 *  * @typedef {(...uri_inputs:string[])=>Promise<void>} routeMethod
 *  * - each of uri_input must never have default value;
 *  *[blank]/
 * ```
 * @typedef {import('./src/__atlaAS.mjs').__atlaAS} __atlaAS_
 * @typedef {(req: __atlaAS_["request"], res: __atlaAS_["response"], next: (pass_message?: any) => any) => (void|Promise<void>)} standard_mw_
 * @typedef {(err:any, req: __atlaAS_["request"], res: __atlaAS_["response"], next: (pass_message?: any) => any) =>(void|Promise<void>)} read_error_
 */