interface GetUserParams {
    userWhoRequestIt?: string;
    username?: string;
    fields?: string[];
}
declare const getUserPageData: ({ userWhoRequestIt, username, fields }: GetUserParams) => Promise<import("axios").AxiosResponse<any, any>>;
export default getUserPageData;
//# sourceMappingURL=getUserPageData.d.ts.map