import {IPost} from "../Post";
import {IMeta} from "../Meta";

export interface PostsState {
    //relatedPosts: (state: TState) => TSelected;
    relatedPosts: any;
    post?: IPost,
    totalCount: number,
    posts?: IPost[],
    meta?: IMeta,
    metas?: IMeta[],
    statusesCount?: {
        [key: string]: number;
    }
    activeEditingLanguage: string
}