import {IPost} from "../Post";
import {IMeta} from "../Meta";

export interface AdminPanelPosts {
    post?: IPost,
    totalCount: number,
    posts?: IPost[],
    meta?: IMeta,
    metas?: IMeta[],
    activeEditingLanguage: string
}