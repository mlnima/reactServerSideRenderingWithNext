import mongoIdValidator from '../util/mongoIdValidator'

const _clientGetPostsQueryGenerator = (queryData, metaIdData) => {
    const sort = queryData?.sort ? {sort: queryData?.sort} : {sort: 'updatedAt'}
    const postType = queryData?.postType ? {postType: queryData?.postType} : {}
    const isValidMetaId = metaIdData ? mongoIdValidator(metaIdData):false
    const metaId = metaIdData && isValidMetaId ? {metaId: metaIdData} :
        metaIdData && !isValidMetaId ? {metaId: encodeURIComponent(metaIdData)}:  {}
    const lang = queryData?.lang ? {lang: queryData?.lang} : {}
    const author = queryData?.author ? {author: queryData?.author} : {}
    const status = queryData?.status ? {status: queryData?.status} : {status: 'published'}
    const keyword = queryData?.keyword ? {keyword: encodeURIComponent(queryData?.keyword)} : {}

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
        'redirectLink',
        'createdAt',
        'updatedAt'
    ].map(f => 'field=' + f).join('&')

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

    const queries = new URLSearchParams(getPostsData).toString()

    return `?${queries}&${fields}`

}

export default _clientGetPostsQueryGenerator