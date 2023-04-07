import {mongoIdValidator, queryUniquer} from "custom-util";
import AxiosInstance from "../../lib/AxiosInstance";
import {postFieldRequestForCards} from "data-structures";
import {postTypes} from "data-structures";

const postTypeValidator = (currentPostType)=>{
    //@ts-ignore
    return currentPostType ? postTypes.includes(currentPostType) : false
}

const getPosts = async (currentQuery:any,medaId?:string|null )=> {
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
    return await AxiosInstance.get(`/api/v1/posts/getPosts?${queries}&${postFieldRequestForCards.map(f => 'field=' + f).join('&')}`)
}
export default getPosts;