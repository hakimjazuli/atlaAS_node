export class mwInputs {
    /**
     * @typedef {import('./routeMethod.type.mjs').standard_mw_} standard_mw
     * @typedef {import('./routeMethod.type.mjs').read_error_} read_error
     * @typedef {standard_mw|read_error} middleware
     * @param {...middleware} middlewares
     * @returns {Promise<boolean>}
     */
    static mw_chains: (...middlewares: (import("./routeMethod.type.mjs").standard_mw_ | import("./routeMethod.type.mjs").read_error_)[]) => Promise<boolean>;
    static mw_chain_helper: {
        /**
         * @param {standard_mw} callback
         * @returns {standard_mw}
         */
        mw: (callback: import("./routeMethod.type.mjs").standard_mw_) => import("./routeMethod.type.mjs").standard_mw_;
        /**
         * @param {read_error} callback
         * @returns {read_error}
         */
        mw_err: (callback: import("./routeMethod.type.mjs").read_error_) => import("./routeMethod.type.mjs").read_error_;
        chains: (...middlewares: (import("./routeMethod.type.mjs").standard_mw_ | import("./routeMethod.type.mjs").read_error_)[]) => Promise<boolean>;
    };
}
