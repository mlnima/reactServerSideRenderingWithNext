interface GetUserParams {
    _id?: string;
    username?: string;
    fields?: string[];
}
declare const getUser: ({ _id, username, fields }: GetUserParams) => Promise<import("axios").AxiosResponse<any, any>>;
export default getUser;
//# sourceMappingURL=getUser.d.ts.map