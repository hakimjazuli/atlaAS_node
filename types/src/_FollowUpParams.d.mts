/**
 * @description
 * - is a [helper class](#helper_class);
 * - class helper for `__atlaAS.__.validate_params` `argument`;
 */
export class _FollowUpParams {
    /**
     * @param {boolean} conditional
     * @param {Object.<string,string>} if_meet_merge
     */
    constructor(conditional: boolean, if_meet_merge: {
        [x: string]: string;
    });
    /**
     * @type {boolean}
     * - consider to use __atlaAS.__.input_match(...args);
     */
    conditional: boolean;
    /**
     * @type {Object.<string,string>}
     */
    if_meet_merge: {
        [x: string]: string;
    };
}
