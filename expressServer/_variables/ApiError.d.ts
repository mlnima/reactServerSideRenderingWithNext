declare class ApiError {
    constructor(code: number, message: string);
    static badRequest(msg: any): ApiError;
    static internal(msg: any): ApiError;
}
export default ApiError;
