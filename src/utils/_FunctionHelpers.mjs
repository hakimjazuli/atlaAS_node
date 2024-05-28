// @ts-check

export class _FunctionHelpers {
	/**
	 * @param {string} path
	 * @returns {Promise<Object>}
	 */
	static dynamic_import = async (path) => {
		const result = await import(path).catch(async () => {
			return await import(`file://${path}`).catch((err) => null);
		});
		return result.default;
	};
}
