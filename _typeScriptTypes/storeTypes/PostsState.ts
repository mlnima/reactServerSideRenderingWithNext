import {Post} from "@_typeScriptTypes/Post";
import {Meta} from "@_typeScriptTypes/Meta";
import {PageTypes} from "@_typeScriptTypes/Page";

export interface PostStateTypes {
    editingPostImagesToUpload: {};
    tagsMetas: Meta[],
    categoriesMetas: Meta[],
    actorsMetas: Meta[],
    pageData: PageTypes,
    posts: Post[],
    relatedPosts: {
        actorsRelatedPosts:Post[],
        categoriesRelatedPosts:Post[],
        tagsRelatedPosts:Post[],
    },
    actorData: Meta,
    categoryData: Meta,
    tagData: Meta,
    totalCount: number,
    post: Post,
    editingPost: Post,
    comments: {}[],
}