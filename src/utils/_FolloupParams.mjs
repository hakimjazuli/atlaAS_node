// @ts-check

export class _FolloupParams {
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
