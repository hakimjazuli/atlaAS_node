// @ts-check

export class __Request {
	/**
	 * @type {__Request}
	 */
	static __;
	/**
	 * @type {import('http').IncomingMessage}
	 */
	static request;
	/**
	 *
	 * @param {import('http').IncomingMessage} request
	 */
	constructor(request) {
		if (__Request.__ !== undefined) {
			return;
		}
		__Request.__ = this;
		__Request.request = request;
		if ((this.is_https = this.assign_http())) {
			this.http_mode = 'https';
		} else {
			this.http_mode = 'http';
		}
	}
	/**
	 * @type {boolean}
	 */
	is_https;
	/**
	 * @type {'http'|'https'}
	 */
	http_mode;
	/**
	 * @private
	 */
	assign_http = () => {
		return true;
	};
}
