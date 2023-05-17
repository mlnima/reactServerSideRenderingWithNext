export declare const dashboardAPIRequestChangePassword: (oldPass: any, newPass: any, newPass2: any) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const dashboardAPIRequestDeleteUser: (id: any) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const dashboardAPIRequestGenerateNewAPIKey: () => Promise<import("axios").AxiosResponse<any, any>>;
export declare const dashboardAPIRequestGetUser: ({ _id, username, fields }: {
    _id?: string;
    username?: string;
    fields?: string[];
}) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const dashboardAPIRequestGetUsers: (queriesData: any) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const dashboardAPIRequestUpdateUser: (data: any) => Promise<import("axios").AxiosResponse<any, any>>;
//# sourceMappingURL=dashboardUsers.d.ts.map