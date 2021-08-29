const _getPostsQueryGenerator = (queryData, size, metaIdData, cache) => {
    const sort = queryData?.sort ? {sort: queryData?.sort} : {sort: 'updatedAt'}
    const postType = queryData?.postType ? {postType: queryData?.postType} : {}
    const metaId = metaIdData ? {metaId: metaIdData} : {}
    const lang = queryData?.lang ? {lang: queryData?.lang} : {}
    const author = queryData?.author ? {author: queryData?.author} : {}
    const status = queryData?.status ? {status: queryData?.status} : {status: 'published'}
    const keyword = queryData?.keyword ? {keyword: encodeURIComponent(queryData?.keyword)} : {}
    const cacheStatus = cache ? {cache} : {}
    const fields = [
        'title',
        'mainThumbnail',
        'quality',
        'likes',
        'disLikes',
        'views',
        'duration',
        'postType',
        'price',
        'translations',
        'videoTrailerUrl',
        'rating',
        'redirectLink']
        .map(f => 'field=' + f).join('&')

    const getPostsData = {
        size: queryData.size || size || '30',
        page: queryData?.page || '1',
        ...status,
        ...author,
        ...lang,
        ...metaId,
        ...postType,
        ...sort,
        ...keyword,
        ...cacheStatus
    }

    const queries = new URLSearchParams(getPostsData).toString()

    return `?${queries}&${fields}`

}

export default _getPostsQueryGenerator