import { IPost, IMeta, IComment, IPage } from '@repo/typescript-types';


export interface PostStateTypes {
    editingPostImagesToUpload: {};
    tagsMetas: IMeta[],
    categoriesMetas: IMeta[],
    actorsMetas: IMeta[],
    pageData: IPage,
    posts: IPost[],
    relatedPosts: {
        actorsRelatedPosts:IPost[],
        categoriesRelatedPosts:IPost[],
        tagsRelatedPosts:IPost[],
    },
    statusesCount:{
        [key:string]:number
    }
    actorData: IMeta,
    categoryData: IMeta,
    tagData: IMeta,
    totalCount: number,
    post: IPost,
    editingPost: IPost,
    comments: IComment[],
}