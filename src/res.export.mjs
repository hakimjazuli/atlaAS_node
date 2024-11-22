// @ts-check

import { __atlaAS } from './__atlaAS.mjs';

/**
 * @description
 * ```js
 * /**
 * * @returns {__atlaAS["response"]}
 * * - current `atlaAS` `http.ServerResponse` instanse
 * *[blank]/
 * ```
 * - use this to get `returns value` outside `mw` `scope`;
 */
export const res = () => __atlaAS.__.response;
