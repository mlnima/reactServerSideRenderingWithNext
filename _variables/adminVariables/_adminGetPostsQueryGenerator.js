

const _adminGetPostsQueryGenerator = (query) => {
    const sort = query?.sort ? {sort: query?.sort} : {sort: 'updatedAt'}
    const postType = query?.postType ? {postType: query?.postType} : {}
    const metaId = query.metaId ? {metaId: query.metaId} : {}
    const lang = query?.lang ? {lang: query?.lang} : {}
    const author = query?.author ? {author: query?.author} : {}
    const status = query?.status ? {status: query?.status} : {status: 'published'}
    const keyword = query?.keyword ? {keyword: encodeURIComponent(query?.keyword)} : {}

    const getPostsData = {
        size: query?.size,
        page: query?.page,
        ...status,
        ...author,
        ...lang,
        ...metaId,
        ...postType,
        ...sort,
        ...keyword,
    }

    const queries = new URLSearchParams(getPostsData).toString()

    return `?${queries}`

}

export default _adminGetPostsQueryGenerator