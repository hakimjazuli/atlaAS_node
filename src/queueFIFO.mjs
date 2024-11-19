// @ts-check

import { _QueueFIFO } from '@html_first/simple_queue';

export class queueFIFO extends _QueueFIFO {
	/**
	 * @type {queueFIFO}
	 */
	static __;
	constructor() {
		super();
		if (queueFIFO.__ !== undefined) {
			return;
		}
		queueFIFO.__ = this;
	}
}
