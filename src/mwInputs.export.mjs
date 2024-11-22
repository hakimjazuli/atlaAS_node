// @ts-check

import { __atlaAS } from './__atlaAS.mjs';

export class mwInputs {
	/**
	 * @typedef {import('./routeMethod.type.mjs').standard_mw_} standard_mw
	 * @typedef {import('./routeMethod.type.mjs').read_error_} read_error
	 * @typedef {standard_mw|read_error} middleware
	 * @param {...middleware} middlewares
	 * @returns {Promise<boolean>}
	 */
	static mw_chains = async (...middlewares) => {
		let call_next = false;
		const req = __atlaAS.__.request;
		const res = __atlaAS.__.response;
		for (let i = 0; i < middlewares.length; i++) {
			call_next = false;
			const mw = middlewares[i];
			if (mw.length === 4) {
				await mw(
					__atlaAS.__.current_error,
					// @ts-ignore
					req,
					res,
					(pass_message) => {
						__atlaAS.__.current_error = pass_message;
						call_next = true;
					}
				);
			} else {
				// @ts-ignore
				await mw(req, res, (pass_message) => {
					__atlaAS.__.current_error = pass_message;
					call_next = true;
				});
			}
			if (!call_next) {
				break;
			}
		}
		return call_next;
	};
	static mw_chain_helper = {
		/**
		 * @param {standard_mw} callback
		 * @returns {standard_mw}
		 */
		mw: (callback) => {
			return callback;
		},
		/**
		 * @param {read_error} callback
		 * @returns {read_error}
		 */
		mw_err: (callback) => {
			return callback;
		},
		chains: mwInputs.mw_chains,
	};
}
