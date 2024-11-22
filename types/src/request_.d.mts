export function request_(request: import("http").IncomingMessage): import("http").IncomingMessage & {
    atlaas_is_https: boolean;
    atlaas_method: string;
    atlaas_http_mode: "https" | "http";
    atlaas_uri: string;
    atlaas_uri_array: string[];
    atlaas_query_param: string;
    atlaas_query_params_object: {
        [k: string]: string;
    };
    atlaas_method_params: () => {
        [k: string]: string;
    };
};
