import {NextRouter} from "next/router";
import {mongoIdValidator} from "../index";
import {postFieldRequestForCards} from "data-structure";

//not in use
const gettingPostsQueryGenerator  = (queryData: NextRouter['query'], metaIdData: string) => {
    const sort = queryData?.sort ? {sort: queryData?.sort} : {sort: 'updatedAt'}
    const postType = queryData?.postType ? {postType: queryData?.postType} : {}
    const isValidMetaId = metaIdData ? mongoIdValidator(metaIdData) : false
    const metaId = metaIdData && isValidMetaId ? {metaId: metaIdData} :
        metaIdData && !isValidMetaId ? {metaId: encodeURIComponent(metaIdData)} : {}
    const lang = queryData?.lang ? {lang: queryData?.lang} : {}
    const author = queryData?.author ? {author: queryData?.author} : {}
    const status = queryData?.status ? {status: queryData?.status} : {status: 'published'}
    const keyword = queryData?.keyword ? {keyword: encodeURIComponent(queryData?.keyword as string)} : {}

    const getPostsData = {
        size: queryData?.size,
        page: queryData?.page,
        ...status,
        ...author,
        ...lang,
        ...metaId,
        ...postType,
        ...sort,
        ...keyword,
    }

    const queries = new URLSearchParams(getPostsData as {}).toString()

    return `?${queries}&${postFieldRequestForCards.map(f => 'field=' + f).join('&')}`

}

export default gettingPostsQueryGenerator;