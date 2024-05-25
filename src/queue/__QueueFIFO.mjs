// @ts-check

import { _QueueFIFO } from '@html_first/simple_queue';

export class __QueueFIFO extends _QueueFIFO {
	/**
	 * @type {__QueueFIFO}
	 */
	// @ts-ignore
	static __ = null;
	constructor() {
		super();
		if (__QueueFIFO.__ !== null) {
			return;
		}
		__QueueFIFO.__ = this;
	}
}
