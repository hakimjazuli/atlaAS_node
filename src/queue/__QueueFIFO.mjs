// @ts-check

import { _QueueFIFO } from '@html_first/simple_queue';

export class __QueueFIFO extends _QueueFIFO {
	/**
	 * @type {__QueueFIFO}
	 */
	static __;
	constructor() {
		super();
		if (__QueueFIFO.__ !== undefined) {
			return;
		}
		__QueueFIFO.__ = this;
	}
}
