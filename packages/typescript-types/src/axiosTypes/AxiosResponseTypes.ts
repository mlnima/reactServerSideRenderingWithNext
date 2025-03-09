import {IPost} from "../Post";

export interface AxiosResponseTypes {
    message?: string,
    posts: IPost[]
    post: IPost
}