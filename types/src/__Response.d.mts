/**
 * @description
 * - is a [singleton](#singleton)
 * - helper for node http["ServerResponse"];
 */
export class __Response {
    /**
     * @type {__Response}
     */
    static __: __Response;
    /**
     *
     * @param {import('http').ServerResponse} response
     */
    constructor(response: import("http").ServerResponse);
    /**
     * @type {import('http').ServerResponse}
     */
    response: import("http").ServerResponse;
    /**
     * @returns {__Response["response"]}
     */
    html: () => __Response["response"];
    /**
     * @returns {__Response["response"]}
     */
    json: () => __Response["response"];
}
