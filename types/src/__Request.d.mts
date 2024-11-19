/**
 * @description
 * - is a [singleton](#singleton)
 * - helper for node http["IncomingMessage"];
 */
export class __Request {
    /**
     * @type {__Request}
     */
    static __: __Request;
    /**
     *
     * @param {import('http').IncomingMessage} request
     */
    constructor(request: import("http").IncomingMessage);
    /**
     * @type {import('http').IncomingMessage}
     */
    request: import("http").IncomingMessage;
    /**
     * @type {string[]}
     */
    uri_array: string[];
    /**
     * @type {Object.<string, string>}
     */
    query_params_array: {
        [x: string]: string;
    };
    /**
     * @type {string}
     */
    uri: string;
    /**
     * @type {string}
     */
    query_param: string;
    /**
     * @type {string}
     */
    method: string;
    /**
     * @type {boolean}
     */
    is_https: boolean;
    /**
     * @type {'http'|'https'}
     */
    http_mode: "http" | "https";
    /**
     * @private
     */
    private assign_http;
    /**
     * @private
     */
    private set_uri;
    method_params: () => {
        [x: string]: string;
    };
}
