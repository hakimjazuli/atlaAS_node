/**
 * @description
 * - is a [singleton](#singleton)
 * - it's for library internal, however it contains properties and methods, that might be usefull for general monitoring;
 */
export class __NodeServer {
    /**
     * @type {__NodeServer}
     */
    static __: __NodeServer;
    /**
     * @private
     * @param {number} port
     * @returns {boolean}
     */
    private static is_valid_port;
    /**
     * @type {import('http').Server}
     */
    server: import("http").Server;
    /**
     * @type {http.IncomingMessage}
     */
    request: http.IncomingMessage;
    /**
     * @type {http.ServerResponse}
     */
    response: http.ServerResponse;
    /**
     * @type {fsRouter}
     */
    fs_router: fsRouter;
    /**
     * @param {http.IncomingMessage} request
     * @param {http.ServerResponse} response
     */
    request_handler: (request: http.IncomingMessage, response: http.ServerResponse) => void;
    /**
     * @private
     */
    private listen_to_random_port;
    /**
     * @private
     */
    private listen_to_port;
    /**
     * @param {number} [overwrite_port]
     */
    start_server: (overwrite_port?: number) => void;
    is_running: boolean;
    /**
     * @param {...any} errors
     */
    close_server: (...errors: any[]) => never;
}
import http from 'http';
import { fsRouter } from './fsRouter.mjs';
