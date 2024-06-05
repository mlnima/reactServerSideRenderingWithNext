import AxiosInstance from "../lib/AxiosInstance";
import {queryUniquer} from 'shared-util'

interface IGetMetasCurrentQuery{
    sort?:string,
    keyword?:string,
    startWith?:string,
    size?:string,
    page?:string,
    lang?:string,
}


export const clientAPIRequestGetMetas = async (currentQuery:IGetMetasCurrentQuery, metaType:string) => {
    const sort = currentQuery?.sort ? {sort: currentQuery?.sort} : {}
    const keyword = currentQuery?.keyword ? {keyword: encodeURIComponent(queryUniquer(currentQuery?.keyword))} : {}
    const startWith = currentQuery?.startWith ? {startWith: currentQuery?.startWith} : {}
    const size = currentQuery?.size ? {size: currentQuery.size} : {}
    const page = currentQuery?.page ? {page: currentQuery?.page} : {}
    const lang = currentQuery?.lang ? {lang: currentQuery?.lang} : {}

    const dataForGettingMeta = {
        metaType,
        ...lang,
        ...page,
        ...size,
        ...startWith,
        ...sort,
        ...keyword,
    }
    console.log('dataForGettingMeta=> ',`/api/v1/posts/getMetas?${new URLSearchParams(dataForGettingMeta as {}).toString()}`)

    return await AxiosInstance.get(`/api/v1/posts/getMetas?${new URLSearchParams(dataForGettingMeta as {}).toString()}`)
}


export const  clientAPIRequestGetMetaSuggestion = async (type: string, startWith: string) => {
    return await AxiosInstance.get(`/api/v1/posts/metaSuggestion?metaType=${type}&startWith=${startWith}`)
}


export const  clientAPIRequestResetMetaImage = async (_id: string) => {
    const body = {
        _id,
        token: localStorage.wt
    };
    return await AxiosInstance.post('/api/v1/posts/resetMetaImage', body)
}

interface IGetTagsQuery{
    sort?:string,
    keyword?:string,
    startWith?:string,
    size?:string,
    page?:string,
    lang?:string,
}

export const clientAPIRequestGetTags = async (queryData:IGetTagsQuery)=>{

    const sort = queryData?.sort ? {sort: queryData?.sort} : {}
    const keyword = queryData?.keyword ? {keyword: encodeURIComponent(queryData?.keyword as string)} : {}
    const startWith = queryData?.startWith ? {startWith: queryData?.startWith} : {}
    const size = queryData.size ? {size: queryData.size} : {}
    const page = queryData?.page ? {page: queryData?.page} : {}
    const lang = queryData?.lang ? {lang: queryData?.lang} : {}
    const dataForGettingMeta = {
        metaType:'tags',
        ...lang,
        ...page,
        ...size,
        ...startWith,
        ...sort,
        ...keyword,
    }
    const queries = new URLSearchParams(dataForGettingMeta as {}).toString()

    return  await AxiosInstance.get(`/api/v1/posts/tags?${queries}`)
}