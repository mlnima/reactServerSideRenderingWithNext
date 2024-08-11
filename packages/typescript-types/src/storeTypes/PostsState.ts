import {Post,Meta,PageTypes,Comment} from "@repo/typescript-types";


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
    statusesCount:{
        [key:string]:number
    }
    actorData: Meta,
    categoryData: Meta,
    tagData: Meta,
    totalCount: number,
    post: Post,
    editingPost: Post,
    comments: Comment[],
}