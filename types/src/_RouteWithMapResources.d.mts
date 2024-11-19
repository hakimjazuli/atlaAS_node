/**
 * @description
 * - is a [helper class](#helper_class);
 * - extended class from [_MapResources](#_mapresources);
 * - also functions as [_Routes](#_routes);
 */
export class _RouteWithMapResources extends _MapResources {
    /**
     * @returns {Promise<any>}
     */
    get: () => Promise<any>;
}
import { _MapResources } from './_MapResources.mjs';