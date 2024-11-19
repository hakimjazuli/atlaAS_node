export class htmlReturn {
    /**
     * @param {string} string_
     */
    constructor(string_: string);
    /**
     * @returns {string}
     */
    string: () => string;
    /**
     * @returns {string}
     */
    no_indent: () => string;
    /**
     * @returns {string}
     */
    single_line: () => string;
    /**
     * @private
     * @type {string}
     */
    private string_;
}
