// @ts-check

import { __QueueFIFO } from './queue/__QueueFIFO.mjs';
import { __Node } from './server/__Node.mjs';

export class __atlaAS {
	/**
	 * @type {__atlaAS}
	 */
	static __;
	constructor() {
		new __QueueFIFO();
		new __Node();
		__atlaAS.__ = this;
	}
}
