/**
 * @typedef {import('http').ServerResponse} ServerResponse_
 * @param {ServerResponse_} response_instance
 */
export function response_(response_instance: ServerResponse_): import("http").ServerResponse<import("http").IncomingMessage> & {
    do_not_response_with_end: boolean;
    atlaas_html(): import("http").ServerResponse<import("http").IncomingMessage>;
    atlaas_json(): import("http").ServerResponse<import("http").IncomingMessage>;
};
export type ServerResponse_ = import("http").ServerResponse;
