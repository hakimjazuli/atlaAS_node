/**
 * @description
 * - is a [singleton](#singleton)
 * - is a [setting_class](#setting_class)
 * - modify class property on the extended class to set the value;
 */
export class __Settings {
    /**
     * @type {__Settings}
     */
    static __: __Settings;
    _use_process_cwd_as_root: boolean;
    _default_port: number;
    _default_debounce_ms: number;
    _base_identifier: string;
    _allow_routes_caching: boolean;
    _file_cache_days: number;
    _routes_path: string;
    _system_file: string;
    _client_reroute_key: string;
    _routes_errors_prefix: string;
    _use_stream: boolean;
    _app_log: string;
    /**
     * @type {string}
     */
    route_mw_ext: string;
    /**
     * @readonly
     */
    readonly middleware_name_: "mw";
    /**
     * @type {string}
     */
    resolved_path: string;
    /**
     * @returns {[boolean,number]}
     */
    use_caching: () => [boolean, number];
    /**
     * @param {boolean} in_production_value
     * @param {boolean} not_in_production_value
     * @returns {boolean}
     */
    if_in_production: (in_production_value: boolean, not_in_production_value: boolean) => boolean;
}
