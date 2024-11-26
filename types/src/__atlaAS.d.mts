/**
 * @description
 * - is a [singleton](#singleton)
 * - use this class to instantiate the server
 * ```js
 * // /backend/atlaAS.mjs
 * new __atlaAS({
 * 	settings: __Settings, // extends from [__Settings](#__settings)
 * 	env: __Env, // extends from [__Env](#__env)
 * 	sqlite3: __Sqlite3, // extends from [__Sqlite3](#__sqlite3)
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
     * @param {typeof import('./__SQLite3.mjs').__SQLite3} [a0.sqlite3]
     * @param {number} [a0.overwrite_port]
     * - undefined: dynamic route call;
     * - _RouteList: allow for bundling, make sure to overwrite __Settings._base_identifier to uppermost dir name of the bundled file(before root);
     */
    constructor({ settings, env, sqlite3, overwrite_port }: {
        settings: typeof import("./__Settings.mjs").__Settings;
        env: typeof import("./__Env.mjs").__Env;
        sqlite3?: typeof import("./__SQLite3.mjs").__SQLite3;
        overwrite_port?: number;
    });
    /**
     * @type {string}
     */
    app_root: string;
    /**
     * @param {any} val
     */
    end_: (val: any) => void;
    /**
     * @type {any}
     */
    current_error: any;
    /**
     * @type {ReturnType<import('./request_.mjs').request_>}
     */
    request: ReturnType<(request: import("http").IncomingMessage) => import("http").IncomingMessage & {
        atlaas_is_https: boolean;
        atlaas_method: string;
        atlaas_http_mode: "https" | "http";
        atlaas_uri: string;
        atlaas_uri_array: string[];
        atlaas_query_param: string;
        atlaas_query_params_object: {
            [k: string]: string;
        };
        atlaas_method_params: () => {
            [k: string]: string;
        };
    }>;
    /**
     * @type {ReturnType<import('./response_.mjs').response_>}
     */
    response: ReturnType<typeof import("./response_.mjs").response_>;
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
