import {Post} from "../Post";
import {Meta} from "../Meta";

export interface PostsState {
    post?: Post,
    totalCount: number,
    posts?: Post[],
    meta?: Meta,
    metas?: Meta[],
    statusesCount?: {
        [key: string]: number;
    }
    activeEditingLanguage: string
}