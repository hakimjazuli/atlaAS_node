/**
 * @description
 * - is a [singleton](#singleton)
 * - is a [setting_class](#setting_class)
 * - custom `sqlite3.Database` instantiator using `__SQLite3.create`, make sure it's called and exported after `__atlaAS` instantiation, as it needs `__atlaAS` instance property;
 * - `sqlite3` helper for common functionality using internals db settings(it's an optional feature, so if you are not inputing it as one of the `__atlaAS` options, you cannot use this functionality):
 * > - rate limiter;
 * > - session handling;
 * > - log;
 * > - quick db using `__SQLite3.__.db`, it's `sqlite3.Database` from `sqlite` `npm module`, you can manually query things if needed;
 */
export class __SQLite3 {
    /**
     * @type {__SQLite3}
     */
    static __: __SQLite3;
    /**
     * @private
     * @type {sqlite3.sqlite3}
     */
    private static verbose;
    /**
     * @param {string} db_path
     * @returns {sqlite3.Database}
     */
    static create: (db_path: string) => sqlite3.Database;
    /**
     * @type {string}
     */
    _db_path: string;
    /**
     * @type {number}
     * - hours
     */
    _session_timeout: number;
    /**
     * @type {number}
     * - days
     */
    _log_db_valid_length: number;
    /**
     * @private
     * @type {{
     * [path_:string]:string
     * }}
     */
    private cached_sql_file;
    /**
     * @private
     * @param {string} path_
     * @returns {string}
     */
    private sql_file;
    /**
     * @type {()=>[sqlite3.Database,disconnect:(errorCheck?:(err:Error|null)=>void)=>void]}
     */
    db: () => [sqlite3.Database, disconnect: (errorCheck?: (err: Error | null) => void) => void];
    /**
     * @param {Object} a0
     * @param {string} [a0.db_path]
     * - `defaultValue` "default": will target atla-as internal database;
     * @param {boolean} [a0.delete_then_recreate]
     * - `defaultValue` = `false`: do nothing;
     * - `true`: will delete atla-as internal database and create blank version of it;
     */
    archive: ({ db_path, delete_then_recreate }: {
        db_path?: string;
        delete_then_recreate?: boolean;
    }) => void;
    /**
     * @param {Object} a0
     * @param {string} a0.context
     * @param {string} a0.message
     * @returns {Promise<boolean>}
     */
    log: ({ context, message }: {
        context: string;
        message: string;
    }) => Promise<boolean>;
    /**
     * @returns {Promise<boolean>}
     */
    session_starts: () => Promise<boolean>;
    session_id: string;
    /**
     * @private
     * @type {number}
     */
    private session_valid_until;
    /**
     * @type {{[key:string]:string}}
     */
    session: {
        [key: string]: string;
    };
    /**
     * @returns {Promise<boolean>}
     */
    delete_session: () => Promise<boolean>;
    /**
     * @param {string} key
     * @param {string} value
     * @returns {Promise<boolean>}
     */
    set_session: (key: string, value: string) => Promise<boolean>;
    /**
     * @param  {number} rate_limit
     * @param  {number} time_window
     * - in seconds
     * @param  {string|null|undefined|string[]} [client_id]
     * @return {Promise<boolean>}
     */
    limit: (rate_limit?: number, time_window?: number, client_id?: string | null | undefined | string[]) => Promise<boolean>;
    /**
     * @private
     * @param {string} context
     */
    private is_valid_call;
}
import sqlite3 from 'sqlite3';
