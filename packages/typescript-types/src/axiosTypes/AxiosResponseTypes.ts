import {Post} from "../Post";

export interface AxiosResponseTypes {
    message?: string,
    posts: Post[]
    post: Post
}