import {Post} from "@_typeScriptTypes/Post";

export interface AxiosResponseTypes {
    message?: string,
    posts: Post[]
    post: Post
}