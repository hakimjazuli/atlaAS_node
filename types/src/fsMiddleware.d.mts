export class fsMiddleware {
    /**
     * @private
     * @type {Map<any, boolean>}
     */
    private allow_cache;
    /**
     * @param {any} identifier
     * @param {()=>Promise<boolean>} callback
     */
    is_mw_allowed: (identifier: any, callback: () => Promise<boolean>) => Promise<boolean>;
    /**
     * @type {string}
     */
    current_middleware: string;
    /**
     * @type {string}
     */
    current_route: string;
    /**
     * @returns {boolean}
     */
    is_folder_exist: () => boolean;
    /**
     *
     * @returns {Promise<boolean>}
     */
    check_mw: () => Promise<boolean>;
}
