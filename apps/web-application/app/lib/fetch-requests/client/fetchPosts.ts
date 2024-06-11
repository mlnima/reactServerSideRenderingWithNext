// @ts-nocheck
import { mongoIdValidator, removeEmptyProperties } from 'shared-util';
import { postFieldRequestForCards } from '@repo/data-structures';
import config from './config';

const APIServerUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;

interface IFetchPost {
    identifier: string;
    revalidate?: number | null;
    tags?: string[];
}

export const fetchPost = async ({ identifier, revalidate }: IFetchPost) => {
    try {
        const queryGeneratorData = mongoIdValidator(identifier)
            ? { _id: identifier }
            : { title: identifier };
        const _id = queryGeneratorData._id
            ? { _id: queryGeneratorData._id }
            : {};
        const title = queryGeneratorData.title
            ? { title: encodeURIComponent(queryGeneratorData.title) }
            : {};
        const queriesDataObject = { ..._id, ...title };
        const queries = `?${new URLSearchParams(queriesDataObject).toString()}`;

        const response = await fetch(
            `${APIServerUrl}/api/v1/posts/getPost${queries}`,
            config({ revalidate, tags: [identifier, 'post', 'cacheItem'] }),
        );
        if (!response.ok) {
            const errorData = await response.text();
            // throw new Error(errorData);
        }
        return await response.json();
    } catch (error) {
        // throw error;
    }
};

export const fetchPostViews = async ({
    identifier,
    revalidate,
}: IFetchPost) => {
    try {
        const queryGeneratorData = mongoIdValidator(identifier)
            ? { _id: identifier }
            : { title: identifier };
        const _id = queryGeneratorData._id
            ? { _id: queryGeneratorData._id }
            : {};
        const title = queryGeneratorData.title
            ? { title: encodeURIComponent(queryGeneratorData.title) }
            : {};
        const queriesDataObject = { ..._id, ...title };
        const queries = `?${new URLSearchParams(queriesDataObject).toString()}`;
        const tag = identifier ? [identifier] : [];
        const response = await fetch(
            `${APIServerUrl}/api/v1/posts/getPostViews${queries}`,

            config({
                revalidate,
                tags: [...tag, 'postViews', 'cacheItem'],
            }),
        );

        if (!response.ok) {
            const errorData = await response.text();
            // throw new Error(errorData);
        }
        return await response.json();
    } catch (error) {
        // throw error;
    }
};

export const fetchPostRating = async ({
    identifier,
    revalidate,
}: IFetchPost) => {
    try {
        const queryGeneratorData = mongoIdValidator(identifier)
            ? { _id: identifier }
            : { title: identifier };
        const _id = queryGeneratorData._id
            ? { _id: queryGeneratorData._id }
            : {};
        const title = queryGeneratorData.title
            ? { title: encodeURIComponent(queryGeneratorData.title) }
            : {};
        const queriesDataObject = { ..._id, ...title };
        const queries = `?${new URLSearchParams(queriesDataObject).toString()}`;

        const response = await fetch(
            `${APIServerUrl}/api/v1/posts/getPostRating${queries}`,
            config({
                revalidate,
                tags: [
                    `${identifier}Rating`,
                    identifier,
                    'postRating',
                    'cacheItem',
                ],
            }),
        );

        if (!response.ok) {
            const errorData = await response.text();
            // throw new Error(errorData);
        }
        return await response.json();
    } catch (error) {
        // throw error;
    }
};

type IFetchPostsProps = {
    queryObject: {};
    locale?: string;
    requestedFields?: string[];
    revalidate?: number | null;
    tags?: string[];
};

export const fetchPosts = async ({
    queryObject,
    locale,
    requestedFields,
    revalidate,
    tags,
}: IFetchPostsProps) => {
    try {
        const requestParameter = removeEmptyProperties(queryObject);
        const queries = `${new URLSearchParams(requestParameter).toString()}`;

        const requestedFieldsQuery = [
            ...postFieldRequestForCards,
            ...(requestedFields || []),
        ]
            .map(f => 'field=' + f)
            .join('&');

        // console.log('requestUrl=> ',`${APIServerUrl}/api/v1/posts/getPosts?${queries}&${requestedFieldsQuery}&locale=${locale}`)
        const response = await fetch(
            `${APIServerUrl}/api/v1/posts/getPosts?${queries}&${requestedFieldsQuery}&locale=${locale}`,
            //@ts-ignore
            config({
                revalidate,
                tags: [...(tags || []), 'cacheItem', 'posts'],
            }),
        );
        if (!response.ok) {
            const errorData = await response.text();
            // throw new Error(errorData);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

type IFetchMetasProps = {
    queryObject: {};
    locale: string;
    requestedFields?: string[];
    revalidate?: number | null;
    tags?: string[];
};

export const fetchMetas = async ({
    queryObject,
    locale,
    revalidate,
    tags,
}: IFetchMetasProps) => {
    try {
        const requestParameter = removeEmptyProperties(queryObject);
        const queries = `?${new URLSearchParams(requestParameter).toString()}`;

        const response = await fetch(
            `${APIServerUrl}/api/v1/posts/getMetas${queries}&locale=${locale}`,
            config({
                revalidate,
                tags: [...(tags || []), 'cacheItem', 'metas'],
            }),
        );
        if (!response.ok) {
            const errorData = await response.text();
            // throw new Error(errorData);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const fetchTags = async ({
    queryObject,
    revalidate,
    tags,
}: IFetchMetasProps) => {
    try {
        const requestParameter = removeEmptyProperties(queryObject);
        const queries = `${new URLSearchParams(requestParameter).toString()}`;

        const response = await fetch(
            `${APIServerUrl}/api/v1/posts/tags?${queries}`,
            config({
                revalidate,
                tags: [...(tags || []), 'cacheItem', 'metas'],
            }),
        );
        if (!response.ok) {
            const errorData = await response.text();
            // throw new Error(errorData);
        }
        return response.json();
    } catch (error) {
        throw error;
    }
};

//we need to handle pagination

export const fetchSearch = async ({
    queryObject,
    locale,
    revalidate,
    tags,
}: IFetchMetasProps) => {
    try {
        const requestParameter = removeEmptyProperties(queryObject);
        const queries = `?${new URLSearchParams(requestParameter).toString()}`;

        const response = await fetch(
            `${APIServerUrl}/api/v1/posts/getSearch${queries}&locale=${locale}`,
            config({
                revalidate,
                tags: [...(tags || []), 'cacheItem', 'posts'],
            }),
        );
        if (!response.ok) {
            const errorData = await response.text();
            // throw new Error(errorData);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

type IFetchUserPagePosts = {
    authorId?: string;
    status: string;
    skip?: number;
    revalidate?: number | null;
    tags?: string[];
};

export const fetchUserPagePosts = async ({
    authorId,
    skip,
    revalidate,
    tags,
    status,
}: IFetchUserPagePosts) => {
    try {
        const response = await fetch(
            `${APIServerUrl}/api/v1/posts/getUserPagePosts?authorId=${authorId}&skip=${skip}&status=${status}`,
            config({
                revalidate,
                tags: [...(tags || []), 'cacheItem', 'posts'],
            }),
        );
        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

type IFetchComments = {
    onDocument?: string;
    skip?: number;
    limit?: number;
    revalidate?: number | null;
    tags?: string[];
};

export const fetchComments = async ({
    onDocument,
    skip = 0,
    limit = 5,
    revalidate = 10,
    tags,
}: IFetchComments) => {
    try {
        const response = await fetch(
            `${APIServerUrl}/api/v1/posts/getComments?onDocument=${onDocument}&skip=${skip}&limit=${limit}`,
            config({
                revalidate,
                tags: [...(tags || []), 'cacheItem', 'comments'],
            }),
        );
        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

type IPostNewComment = {
    commentData?: {};
    revalidate?: number | null;
};

export const postNewComment = async ({
    commentData,
    revalidate,
}: IPostNewComment) => {
    try {
        const response = await fetch(
            `${APIServerUrl}/api/v1/posts/newComment`,
            config({
                revalidate,
                method: 'POST',
                body: { commentData },
            }),
        );

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};
