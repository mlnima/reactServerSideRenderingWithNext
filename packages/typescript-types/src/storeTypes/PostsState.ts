import { Post, Meta, IComment, IPage } from '@repo/typescript-types';


export interface PostStateTypes {
    editingPostImagesToUpload: {};
    tagsMetas: Meta[],
    categoriesMetas: Meta[],
    actorsMetas: Meta[],
    pageData: IPage,
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
    comments: IComment[],
}