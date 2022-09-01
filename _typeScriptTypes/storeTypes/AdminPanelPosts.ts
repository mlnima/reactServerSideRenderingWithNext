import {Post} from "@_typeScriptTypes/Post";
import {Meta} from "@_typeScriptTypes/Meta";

export interface AdminPanelPosts {
    post?: Post,
    totalCount: number,
    posts?: Post[],
    meta?: Meta,
    metas?: Meta[],
    activeEditingLanguage: string
}