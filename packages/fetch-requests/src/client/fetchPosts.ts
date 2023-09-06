import {mongoIdValidator, removeEmptyProperties} from "custom-util";
import {postFieldRequestForCards} from "data-structures";
const APIServerUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
import config from './config'

export const fetchPost = async (identifier: string, revalidate?: number | null) => {
    try {
        const queryGeneratorData = mongoIdValidator(identifier) ? {_id: identifier} : {title: identifier};
        const _id = queryGeneratorData._id ? {_id: queryGeneratorData._id} : {};
        const title = queryGeneratorData.title ? {title: encodeURIComponent(queryGeneratorData.title)} : {};
        const queriesDataObject = {..._id, ...title};
        const queries = `?${new URLSearchParams(queriesDataObject).toString()}`;

        const response = await fetch(
            `${APIServerUrl}/api/v1/posts/getPost${queries}`,
            config({revalidate})
        );

        return await response.json()
    } catch (error) {
        console.error('error=> ', error)
    }
}

type IFetchPostsProps = {
    queryObject: {},
    requestedFields?: string[],
    revalidate?: number | null
}

export const fetchPosts = async ({queryObject, requestedFields, revalidate}: IFetchPostsProps) => {
    try {
        const requestParameter = removeEmptyProperties(queryObject)
        const queries = `?${new URLSearchParams(requestParameter).toString()}`;

        const requestedFieldsQuery = (
            [...postFieldRequestForCards, ...(requestedFields || [])]
        ).map(f => 'field=' + f).join('&');

        const response = await fetch(
            `${APIServerUrl}/api/v1/posts/getPosts?${queries}&${requestedFieldsQuery}`,
            //@ts-ignore
            config({revalidate})
        );
        return await response.json()
    } catch (error) {
        // console.error('error=> ',error)
    }
}

type IFetchMetasProps = {
    queryObject: {},
    requestedFields?: string[],
    revalidate?: number | null
}

export const fetchMetas = async ({queryObject, revalidate}: IFetchMetasProps) => {
    try {
        const requestParameter = removeEmptyProperties(queryObject)
        const queries = `?${new URLSearchParams(requestParameter).toString()}`;

        const response = await fetch(
            `${APIServerUrl}/api/v1/posts/getMetas${queries}`,
            config({revalidate})
        );

        return await response.json()
    } catch (error) {

    }
}

export const fetchTags = async ({queryObject, revalidate}: IFetchMetasProps) => {
    try {
        const requestParameter = removeEmptyProperties(queryObject)
        const queries = `?${new URLSearchParams(requestParameter).toString()}`;

        const response = await fetch(
            `${APIServerUrl}/api/v1/posts/tags?${queries}`,
            config({revalidate})
        );

        return response.json()
    } catch (error) {

    }
}

//we need to handle pagination

export const fetchSearch = async ({queryObject, revalidate}: IFetchMetasProps) => {
    try {
        const requestParameter = removeEmptyProperties(queryObject)
        const queries = `?${new URLSearchParams(requestParameter).toString()}`;

        const response = await fetch(
            `${APIServerUrl}/api/v1/posts/getSearch${queries}`,
            config({revalidate})
        );

        return await response.json()
    } catch (error) {

    }
}


type IFetchUserPagePosts = {
    authorId?: string,
    skip?: number,
    revalidate?: number | null
}

export const fetchUserPagePosts = async ({authorId, skip, revalidate}: IFetchUserPagePosts) => {
    try {

        const response = await fetch(
            `${APIServerUrl}/api/v1/posts/getUserPagePosts?authorId=${authorId}&skip=${skip}`,
            config({revalidate})
        );

        return await response.json()
    } catch (error) {

    }
}

type IFetchComments = {
    onDocument?: string,
    skip?: number,
    limit?: number,
    revalidate?: number | null
}

export const fetchComments = async ({onDocument, skip = 0, limit = 5, revalidate}: IFetchComments) => {
    try {

        const response = await fetch(
            `${APIServerUrl}/api/v1/posts/getComments?onDocument=${onDocument}&skip=${skip}&limit=${limit}`,
            config({revalidate})
        );

        return await response.json()
    } catch (error) {

    }
}

type IPostNewComment = {
    commentData?: {},
    revalidate?: number | null
}

export const postNewComment = async ({commentData, revalidate}: IPostNewComment) => {
    try {

        const response = await fetch(
            `${APIServerUrl}/api/v1/posts/newComment`,
            config({revalidate, method: 'POST', body: {commentData}})
        );

        return await response.json()
    } catch (error) {

    }
}

