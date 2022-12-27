const _adminGetPostsQueryGenerator = (searchParams:any) => {
    const sort = searchParams.get('sort') ? {sort: searchParams.get('sort')} : {sort: 'updatedAt'}
    const size = searchParams.get('size')  ? {size:searchParams.get('size')} : {}
    const page = searchParams.get('page') ? {page: searchParams.get('page')} : {}
    const postType =searchParams.get('postType')   ? {postType: searchParams.get('postType')} : {}
    const metaId =searchParams.get('metaId')  ? {metaId: searchParams.get('metaId')} : {}
    const lang = searchParams.get('lang')   ? {lang: searchParams.get('lang')} : {}
    const author =searchParams.get('author')  ? {author: searchParams.get('author')} : {}
    const status =searchParams.get('status')  ? {status:searchParams.get('status')} : {status: 'published'}
    const keyword =searchParams.get('keyword')  ? {keyword: encodeURIComponent(searchParams.get('keyword') as string)} : {}

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