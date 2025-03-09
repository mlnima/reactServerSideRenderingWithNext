import {IPost} from "../Post";
import {Meta} from "../Meta";

export interface PostsState {
    post?: IPost,
    totalCount: number,
    posts?: IPost[],
    meta?: Meta,
    metas?: Meta[],
    statusesCount?: {
        [key: string]: number;
    }
    activeEditingLanguage: string
}