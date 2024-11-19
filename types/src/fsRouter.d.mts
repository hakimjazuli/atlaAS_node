export class fsRouter extends fsMiddleware {
    run: () => Promise<void>;
    /**
     * @private
     * @type {number}
     */
    private routes_length;
    /**
     * @private
     * @type {object|string|false}
     */
    private real_route;
    /**
     * @private
     * @type {number}
     */
    private request_length;
    /**
     * @private
     */
    private handle_mw;
    /**
     * @param {boolean} is_real_route
     */
    render: (is_real_route?: boolean) => Promise<string>;
    /**
     * @private
     * @return {boolean}
     */
    private check_route;
    /**
     * @private
     * @param {boolean} is_real_route
     * @returns {Promise<boolean|string>}
     */
    private run_real_route;
    /**
     * @private
     * @param {string} route_full_path
     * @param {_Routes} route_instance
     * @returns {Promise<boolean|string>}
     * - if map_resources || mw_blocked then retrurns true;
     */
    private check_is_map_resources_or_mw_blocked;
    /**
     * @private
     * @param {_Routes} route_instance
     */
    private run_method_with_input_logic;
    /**
     * @public
     * @type {null|Object.<string,string>}
     */
    public form_s_input_param: null | {
        [x: string]: string;
    };
}
import { fsMiddleware } from './fsMiddleware.mjs';
