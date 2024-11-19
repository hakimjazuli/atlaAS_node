/**
 * @description
 * - is a [singleton](#singleton)
 * - use this class to instantiate the server
 * ```js
 * // /backend/atlaAS.mjs
 * new __atlaAS({
 * 	settings: __Settings, // extends from [__Settings](#__settings)
 * 	env: __Env, // extends from [__Env](#__env)
 * 	...options
 * });
 * ```
 * - call using bun or node
 * ```shell
 * bun --watch ./backend/atlaAS.mjs
 * npm run ./backend/atlaAS.mjs -- --watch
 * ```
 * - it's recomended to save the script on the package.json for convenience
 */
export class __atlaAS {
    /**
     * @type {__atlaAS}
     */
    static __: __atlaAS;
    /**
     * @private
     * @param {number} port
     * @returns {boolean}
     */
    private static is_valid_port;
    /**
     * @param {Object} a0
     * @param {typeof import('./__Settings.mjs').__Settings} a0.settings
     * @param {typeof import('./__Env.mjs').__Env} a0.env
     * @param {number} [a0.overwrite_port]
     * - undefined: dynamic route call;
     * - _RouteList: allow for bundling, make sure to overwrite __Settings._base_identifier to uppermost dir name of the bundled file(before root);
     */
    constructor({ settings, env, overwrite_port }: {
        settings: typeof import("./__Settings.mjs").__Settings;
        env: typeof import("./__Env.mjs").__Env;
        overwrite_port?: number;
    });
    /**
     * @type {string}
     */
    app_root: string;
    /**
     * @private
     * @param {string} curent__
     * @returns {string}
     */
    private get_base;
    /**
     * @param {string} route_path
     * - project absoulte path to the route
     * @param {string[]} uri_input
     * @param {Object.<string,string>} query_parameters
     * @param {boolean} inherit_query_parameters
     * @returns {Promise<any>}
     */
    render_get: (route_path: string, uri_input?: string[], query_parameters?: {
        [x: string]: string;
    }, inherit_query_parameters?: boolean) => Promise<any>;
    /**
     * @param {import('./_Routes.mjs')._Routes|
     * import('./_Middleware.mjs')._Middleware} class_instance
     */
    assign_query_param_to_class_property: (class_instance: import("./_Routes.mjs")._Routes | import("./_Middleware.mjs")._Middleware) => void;
    /**
     * @param {string} location
     * @param {string[]} url_input
     * @param {boolean} use_client_side_routing
     */
    reroute: (location: string, url_input?: string[], use_client_side_routing?: boolean, message?: string) => void;
    /**
     * @param {number} code
     * @param {boolean} use_client_side_routing
     */
    reroute_error: (code?: number, use_client_side_routing?: boolean) => void;
    /**
     * @param {string|((query_parameters:Object.<string,string>)=>(any|Promise<any>))} fallback string:
     * - full path prefixed with '/';
     * - ends with file extention too;
     * @param {string[]} url_input
     * - array input for get method arguments;
     * @param {import('./_FollowUpParams.mjs')._FollowUpParams[]} conditionals
     * @param {Object.<string,string>} query_parameter
     * @param {boolean} inherit_query_parameter rendered route will:
     * - true:  inherit parent query parameter merged with $query_parameters;
     * - false: use $query_parameters as new query parameters;
     * @returns {Promise<boolean>}
     * manually wrap this function call on if(!validate_params(..args)){
     * 	return;
     * }
     */
    validate_params: (fallback: string | ((query_parameters: {
        [x: string]: string;
    }) => (any | Promise<any>)), url_input?: string[], conditionals?: import("./_FollowUpParams.mjs")._FollowUpParams[], query_parameter?: {
        [x: string]: string;
    }, inherit_query_parameter?: boolean) => Promise<boolean>;
    /**
     * @param {RegExp} regex
     * @param {string} input_name
     * - key of method parameter
     */
    input_match: (regex: RegExp, input_name: string) => boolean;
}
