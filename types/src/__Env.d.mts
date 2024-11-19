/**
 * @description
 * - is a [singleton](#singleton)
 * - placeholder for for environtmental values;
 * - always put the this extended class on `.ignore` on your shared code management;
 * - modify class property on the extended class to set the value;
 */
export class __Env {
    /**
     * @type {__Env}
     */
    static __: __Env;
    _in_production: boolean;
}
