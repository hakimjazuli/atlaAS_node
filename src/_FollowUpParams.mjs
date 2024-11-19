// @ts-check

/**
 * @description
 * - is a [helper class](#helper_class);
 * - class helper for `__atlaAS.__.validate_params` `argument`;
 */
export class _FollowUpParams {
	/**
	 * @type {boolean}
	 * - consider to use __atlaAS.__.input_match(...args);
	 */
	conditional;
	/**
	 * @type {Object.<string,string>}
	 */
	if_meet_merge;
	/**
	 * @param {boolean} conditional
	 * @param {Object.<string,string>} if_meet_merge
	 */
	constructor(conditional, if_meet_merge) {
		this.conditional = conditional;
		this.if_meet_merge = if_meet_merge;
	}
}
