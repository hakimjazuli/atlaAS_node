/**
 * @description
 * - is a [helper class](#helper_class);
 * - static `methods` to handle `fileSystem` serving;
 */
export class _FileServer {
    /**
     * @private
     * @type {string|undefined}
     */
    private static log_dir;
    /**
     * @param {Object} options
     * @param {string} options.prefix
     * @param {Object} options.content
     * @return {string}
     */
    static log: ({ prefix, content }: {
        prefix: string;
        content: any;
    }) => string;
    /**
     * @param {string} absolute_path
     */
    static get_string: (absolute_path: string) => string;
    /**
     * @param {string} server_url
     * - absolute path '/routes/'
     * @returns {string}
     */
    static file_version: (server_url: string) => string;
    /**
     * @param {string[]} relative_path
     * @param {string} system_dir
     * @param {boolean} force_download
     * @returns {void}
     */
    static serves: (relative_path: string[], system_dir: string, force_download?: boolean) => void;
    /**
     * @private
     * @param {string} file
     * @param {boolean} force_download
     * @returns {'is_system_file'|'is_resource_file'|'not_found'}
     */
    private static page_resource_handler;
    /**
     * @private
     * @param {string} filename
     * @param {boolean} force_download
     * @returns {void}
     */
    private static file_handler;
    /**
     * @private
     * @param {number} days
     * @param {boolean} force_cache
     */
    private static caching;
    /**
     * @private
     * @param {number} days
     * @returns {number}
     */
    private static unix_unit_to_days;
    /**
     * @private
     * @param {string} filename
     */
    private static get_content_type;
    /**
     * @private
     * @param {string} path
     * @returns {void}
     */
    private static download_force;
}
