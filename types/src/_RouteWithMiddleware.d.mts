/**
 * @description
 * - is a [helper class](#helper_class);
 * - extended class from [_MapResources](#_mapresources);
 * - also has [mw](#_middleware) method that functions as middleware;
 */
export class _RouteWithMiddleware extends _Routes {
    /**
     * @type {import('./routeMethod.type.mjs').mwMethod}
     */
    mw: import("./routeMethod.type.mjs").mwMethod;
}
import { _Routes } from './_Routes.mjs';
