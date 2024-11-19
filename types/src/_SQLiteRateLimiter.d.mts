/**
 * @description
 * - is a [helper class](#helper_class);
 * - access limiter using `sqlite3`, call the method on a middleware to limit overall access to the site;
 */
export class _SQLiteRateLimiter {
    /**
     * @param  {string} db_path
     * @param  {number} rate_limit
     * @param  {number} time_window in seconds
     * @param  {string|null|undefined|string[]} client_id
     * @return {Promise<boolean>}
     */
    static limit: (db_path: string, rate_limit?: number, time_window?: number, client_id?: string | null | undefined | string[]) => Promise<boolean>;
}
