/**
 * @description
 * - is a [helper class](#helper_class);
 * - extended class from [_MapResources](#_mapresources);
 * - also functions as [_Routes](#_routes);
 * - also has [mw](#_middleware) method that functions as middleware;
 */
export class _RouteWithMapResourcesAndMiddleware extends _RouteWithMapResources {
    /**
     * @param {string} method
     * @returns {Promise<boolean>}
     */
    mw: (method: string) => Promise<boolean>;
}
import { _RouteWithMapResources } from './_RouteWithMapResources.mjs';
