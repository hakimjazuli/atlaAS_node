/**
 * @description
 * - is a [helper class](#helper_class);
 * - extended class from [_MapResources](#_mapresources);
 * - also has [mw](#_middleware) method that functions as middleware;
 */
export class _RouteWithMiddleware extends _Routes {
    /**
     * @type {import('./route_method.type.mjs').mw_method}
     */
    mw: import("./route_method.type.mjs").mw_method;
}
import { _Routes } from './_Routes.mjs';
