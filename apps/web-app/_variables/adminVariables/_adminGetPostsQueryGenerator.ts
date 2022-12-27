import {NextRouter} from "next/router";

const _adminGetPostsQueryGenerator = (query: NextRouter['query']) => {
    const sort = query?.sort ? {sort: query?.sort} : {sort: 'updatedAt'}
    const size = query?.size ? {size: query?.size} : {}
    const page = query?.page ? {page: query?.page} : {}
    const postType = query?.postType ? {postType: query?.postType} : {}
    const metaId = query.metaId ? {metaId: query.metaId} : {}
    const lang = query?.lang ? {lang: query?.lang} : {}
    const author = query?.author ? {author: query?.author} : {}
    const status = query?.status ? {status: query?.status} : {status: 'published'}
    const keyword = query?.keyword ? {keyword: encodeURIComponent(query?.keyword as string)} : {}

    const getPostsData = {
        ...size,
        ...page,
        ...status,
        ...author,
        ...lang,
        ...metaId,
        ...postType,
        ...sort,
        ...keyword,
    }

    const queries = new URLSearchParams(getPostsData as {}).toString()

    return `?${queries}`
}

export default _adminGetPostsQueryGenerator