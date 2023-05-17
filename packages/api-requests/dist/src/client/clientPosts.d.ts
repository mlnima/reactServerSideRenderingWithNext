import { AxiosResponse } from "axios";
export declare const clientAPIRequestAttendToEvent: (postId: any, userId: any, actionType: any) => Promise<AxiosResponse<any, any>>;
export declare const clientAPIRequestCreateNewPost: (data: any) => Promise<{
    newPostId: string;
}>;
export declare const clientAPIRequestDisLikePost: (postId: any) => Promise<AxiosResponse<any, any>>;
export declare const clientAPIRequestGetEditingPost: (postId: any) => Promise<AxiosResponse<any, any>>;
export declare const clientAPIRequestGetPost: (identifier: string) => Promise<AxiosResponse<any, any>>;
export declare const clientAPIRequestGetPosts: (currentQuery: any, medaId?: string | null) => Promise<AxiosResponse<any, any>>;
export declare const clientAPIRequestLikePost: (postId: any) => Promise<AxiosResponse<any, any>>;
export declare const clientAPIRequestUpdatePost: (data: any) => Promise<AxiosResponse<any, any>>;
export declare const clientAPIRequestViewPost: (postId: any) => Promise<AxiosResponse<any, any>>;
//# sourceMappingURL=clientPosts.d.ts.map