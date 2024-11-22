// @ts-check

import { __atlaAS } from './__atlaAS.mjs';

/**
 * @description
 * ```js
 * /**
 * * @returns {__atlaAS["request"]}
 * * - current `atlaAS` `http.IncomingMessage` instanse
 * *[blank]/
 * ```
 * - use this to get `returns value` outside `mw` `scope`;
 */
export const req = () => __atlaAS.__.request;
