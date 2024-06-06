// @ts-check

export class _Middleware {
	/**
	 * @param {string} method
	 * @returns {Promise<boolean>}
	 */
	mw = async (method) => {
		/**
		 * mock return;
		 */
		return true;
	};
}
