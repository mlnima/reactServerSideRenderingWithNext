import AxiosInstance from "../lib/AxiosInstance";
import {AxiosResponse} from "axios";
// import {createNewPostResponse} from "./posts/createNewPost";
import {mongoIdValidator, queryUniquer} from "custom-util";
import {postFieldRequestForCards,postTypes} from "data-structure";

const postTypeValidator = (currentPostType:string)=>{
    //@ts-ignore
    return currentPostType ? postTypes.includes(currentPostType) : false
}



export const clientAPIRequestAttendToEvent = async (postId:string, userId:string, actionType:string) => {
    const body = {
        id: postId,
        userId,
        actionType,
    };

    return await AxiosInstance.post('/api/v1/posts/attendToEvent', body)
}


export const clientDeletePostByAuthor = async (postId:string) => {
    return await AxiosInstance.delete(`/api/v1/posts/deletePostByAuthor?postId=${postId}`)
}


export const  clientAPIRequestCreateNewPost = async (data:{}): Promise<{ newPostId: string }> => {
    const response: AxiosResponse<{
        newPostId: string;
    }> = await AxiosInstance.post<{
        newPostId: string;
    }>(
        '/api/v1/posts/newPost', {data, token: localStorage.wt}
    );
    return response.data;
}


export const clientAPIRequestDisLikePost = async (postId:string) => {
    const ratingData = localStorage?.ratingData ? JSON.parse(localStorage.ratingData) : {likes: [], disLikes: []};
    ratingData.disLikes = [...new Set([...ratingData.disLikes, postId])]
    ratingData.likes = ratingData.likes.filter((liked:string) => liked !== postId)
    localStorage.setItem('ratingData', JSON.stringify(ratingData))

    const body = {
        id:postId,
        type: 'disLikes'
    };

    return await AxiosInstance.post('/api/v1/posts/likeDislikeView', body)
}


export const clientAPIRequestGetEditingPost = async (postId:string) => {
    const queries= new URLSearchParams({_id: postId}).toString();
    return await AxiosInstance.get(`/api/v1/posts/getEditingPost?${queries}`);
}


export const clientAPIRequestGetPost = async (identifier:string) => {
    const queryGeneratorData = mongoIdValidator(identifier) ? {_id: identifier} : {title: identifier}
    const _id = queryGeneratorData._id ? {_id: queryGeneratorData._id} : {}
    const title = queryGeneratorData.title ? {title: encodeURIComponent(queryGeneratorData.title)} : {}
    const queriesDataObject  = {..._id,...title}
    //@ts-ignore
    const queries= `?${new URLSearchParams(queriesDataObject).toString()}`

    return await AxiosInstance.get(`/api/v1/posts/getPost${queries}`)
}

export const clientAPIRequestGetPosts = async (currentQuery:any,medaId?:string|null )=> {
    const sort = !!currentQuery?.sort ? {sort: currentQuery?.sort} : {sort: 'updatedAt'}
    const postType = postTypeValidator(currentQuery?.postType) ? {postType: currentQuery?.postType} : {}
    const isValidMetaId = !!medaId ? mongoIdValidator(medaId) : false
    const metaId = !!medaId && isValidMetaId ? {metaId: medaId} :
        medaId && !isValidMetaId ? {metaId: encodeURIComponent(medaId)} : {}
    const lang = !!currentQuery?.lang ? {lang: currentQuery?.lang} : {}
    const author = !!currentQuery?.author ? {author: currentQuery?.author} : {}
    const status = !!currentQuery?.status ? {status: currentQuery?.status} : {status: 'published'}
    const keyword = !!currentQuery?.keyword ? {keyword: encodeURIComponent( queryUniquer( currentQuery?.keyword))} : {}

    const getPostsData = {
        size: currentQuery?.size,
        page: currentQuery?.page,
        ...status,
        ...author,
        ...lang,
        ...metaId,
        ...postType,
        ...sort,
        ...keyword,
    }

    const queries = new URLSearchParams(getPostsData as {}).toString()
    return await AxiosInstance.get(`/api/v1/posts/getPosts?${queries}&${postFieldRequestForCards.map((f :string)=> 'field=' + f).join('&')}`)
}



export const clientAPIRequestLikePost = async (postId:string) => {
    const ratingData = localStorage?.ratingData ? JSON.parse(localStorage.ratingData) : {likes: [], disLikes: []};
    ratingData.likes = [...new Set([...ratingData.likes, postId])]
    ratingData.disLikes = ratingData.disLikes.filter((disLiked:string) => disLiked !== postId)
    localStorage.setItem('ratingData', JSON.stringify(ratingData))

    const body = {
        id:postId,
        type: 'likes'
    };

    return await AxiosInstance.post('/api/v1/posts/likeDislikeView', body)
}

export const clientAPIRequestLikeDislikePost = async (_id:string,type:'likes'|'disLikes') => {
    const body = {
        _id,
        type
    };
    return await AxiosInstance.patch('/api/v1/posts/likeDislikePost', body)
}

export const clientAPIRequestUpdatePost = async (data:{}) => {
    return await AxiosInstance.post(`/api/v1/posts/updatePost`, {data,token: localStorage.wt});
}

export const clientAPIRequestViewPost = async (postId:string) => {
    const body = {
        id:postId,
        type: 'views'
    };

    return await AxiosInstance.post('/api/v1/posts/likeDislikeView', body)
}
