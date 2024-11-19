/**
 * @description
 * - is a [helper class](#helper_class);
 * - `allow` incoming `cors` connections with filters;
 */
export class _Cors {
    /**
     * @param {string[]} allowed_origins - If it contains '*', it allows all origins.
     * @param {string[]} allowed_methods - If it contains '*', it allows all methods.
     * @param {string[]} allowed_headers - If it contains '*', it allows all headers.
     * @param {Number} max_age - Max age in days.
     */
    static allow(allowed_origins?: string[], allowed_methods?: string[], allowed_headers?: string[], max_age?: number): boolean;
}
