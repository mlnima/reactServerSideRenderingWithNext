import paramsObjectGenerator from "@variables/paramsObjectGenerator";

const paramsQueryGenerator = (searchParams:any) => {
    // const sort = searchParams.get('sort') ? {sort: searchParams.get('sort')} : {sort: 'updatedAt'}
    // const size = searchParams.get('size')  ? {size:searchParams.get('size')} : {}
    // const assetsType = searchParams.get('assetsType')  ? {assetsType:searchParams.get('assetsType')} : {}
    // const page = searchParams.get('page') ? {page: searchParams.get('page')} : {}
    // const postType =searchParams.get('postType')   ? {postType: searchParams.get('postType')} : {}
    // const metaType =searchParams.get('metaType')   ? {metaType: searchParams.get('metaType')} : {}
    // const metaId =searchParams.get('metaId')  ? {metaId: searchParams.get('metaId')} : {}
    // const lang = searchParams.get('lang')   ? {lang: searchParams.get('lang')} : {}
    // const author =searchParams.get('author')  ? {author: searchParams.get('author')} : {}
    // const status =searchParams.get('status')  ? {status:searchParams.get('status')} : {}
    // const keyword =searchParams.get('keyword')  ? {keyword: encodeURIComponent(searchParams.get('keyword') as string)} : {}
    //

    // const getPostsData = {
    //     ...assetsType,
    //     ...size,
    //     ...page,
    //     ...status,
    //     ...author,
    //     ...lang,
    //     ...metaId,
    //     ...metaType,
    //     ...postType,
    //     ...sort,
    //     ...keyword,
    // }

    const getPostsData = paramsObjectGenerator(searchParams)
    //@ts-ignore
    const queries = new URLSearchParams(getPostsData).toString()

    return `?${queries}`
}

export default paramsQueryGenerator;