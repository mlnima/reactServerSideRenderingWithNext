class ApiError {
    constructor(code: number, message: string) {
        //@ts-ignore
        this.code = code;
        //@ts-ignore
        this.message = message;
    }

    static badRequest(msg) {
        return new ApiError(400, msg);
    }

    static internal(msg) {
        return new ApiError(500, msg);
    }
}

export default ApiError;