import {mongoIdValidator, removeEmptyProperties} from "custom-util";
import {postFieldRequestForCards} from "data-structures";
const APIServerUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
import config from './config'


export const fetchPost = async (identifier:string,revalidate?:number|null)=>{
    try {
        const queryGeneratorData = mongoIdValidator(identifier) ? {_id: identifier} : {title: identifier};
        const _id = queryGeneratorData._id ? {_id: queryGeneratorData._id} : {};
        const title = queryGeneratorData.title ? {title: encodeURIComponent(queryGeneratorData.title)} : {};
        const queriesDataObject  = {..._id,...title};
        const queries= `?${new URLSearchParams(queriesDataObject).toString()}`;
        //@ts-ignore
        const response = await fetch(`${APIServerUrl}/api/v1/posts/getPost${queries}`, config(revalidate));
        return await response.json()
    }catch (error){
        console.error('error=> ',error)
    }
}

interface IFetchPostsProps{
    queryObject:{},
    requestedFields?:string[],
    revalidate?:number|null
}

export const fetchPosts = async ({queryObject, requestedFields, revalidate}:IFetchPostsProps)=>{
    try {
        const requestParameter = removeEmptyProperties(queryObject)
        const queries= `?${new URLSearchParams(requestParameter).toString()}`;

        const requestedFieldsQuery = (
            [...postFieldRequestForCards,...(requestedFields || [])]
        ).map(f => 'field=' + f).join('&');

        const response = await fetch(
            `${APIServerUrl}/api/v1/posts/getPosts?${queries}&${requestedFieldsQuery}`,
            //@ts-ignore
            config(revalidate))
        return await response.json()
    }catch (error){
        // console.error('error=> ',error)
    }
}

interface IFetchMetasProps{
    queryObject:{},
    requestedFields?:string[],
    revalidate?:number|null
}

export const fetchMetas = async ({queryObject, revalidate}:IFetchMetasProps)=>{
    try {
        const requestParameter = removeEmptyProperties(queryObject)
        const queries= `?${new URLSearchParams(requestParameter).toString()}`;

        const response = await fetch(
            `${APIServerUrl}/api/v1/posts/getMetas${queries}`,
            //@ts-ignore
            config(revalidate))
        return await response.json()
    }catch (error){
        // console.error('error=> ',error)
    }
}

export const fetchTags = async ({queryObject, revalidate}:IFetchMetasProps)=>{
    try {
        const requestParameter = removeEmptyProperties(queryObject)
        const queries= `?${new URLSearchParams(requestParameter).toString()}`;

        const response = await fetch(
            `${APIServerUrl}/api/v1/posts/tags?${queries}`,
            //@ts-ignore
            config(revalidate))

        return await response.json()
    }catch (error){
        // console.error('error=> ',error)
    }
}