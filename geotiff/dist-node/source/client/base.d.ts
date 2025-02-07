export class BaseResponse {
    /**
     * Returns whether the response has an ok'ish status code
     */
    get ok(): boolean;
    /**
     * Returns the status code of the response
     */
    get status(): void;
    /**
     * Returns the value of the specified header
     * @param {string} headerName the header name
     * @returns {string} the header value
     */
    getHeader(headerName: string): string;
    /**
     * @returns {ArrayBuffer} the response data of the request
     */
    getData(): ArrayBuffer;
}
export class BaseClient {
    constructor(url: any);
    url: any;
    /**
     * Send a request with the options
     * @param {{headers: HeadersInit, signal: AbortSignal}} [options={}]
     * @returns {Promise<BaseResponse>}
     */
    request({ headers, signal }?: {
        headers: HeadersInit;
        signal: AbortSignal;
    } | undefined): Promise<BaseResponse>;
}
//# sourceMappingURL=base.d.ts.map