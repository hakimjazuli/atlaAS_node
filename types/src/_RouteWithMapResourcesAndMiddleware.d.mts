/**
 * @description
 * - is a [helper class](#helper_class);
 * - extended class from [_MapResources](#_mapresources);
 * - also functions as [_Routes](#_routes);
 * - also has [mw](#_middleware) method that functions as middleware;
 */
export class _RouteWithMapResourcesAndMiddleware extends _RouteWithMapResources {
    /**
     * @type {import('./routeMethod.type.mjs').mwMethod}
     */
    mw: import("./routeMethod.type.mjs").mwMethod;
}
import { _RouteWithMapResources } from './_RouteWithMapResources.mjs';
