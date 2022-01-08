

const _metaPageQueryGenerator = (queryData,metaType,cache) =>{
    const sort = queryData?.sort ? {sort: queryData?.sort}: {}
    const keyword = queryData?.keyword ? { keyword: encodeURIComponent(queryData?.keyword)}: {}
    const cacheStatus = cache ? {cache} : {}
    const dataForGettingMeta = {
        metaType,
        page: queryData?.page || 1,
        size: queryData.size || process.env.NEXT_PUBLIC_SETTING_POSTS_COUNT_PER_PAGE || 60,
        startWith: queryData?.startWith || 'any',
        lang: queryData?.lang || 'default',
        status: queryData.status || 'published',
        ...sort,
        ...keyword,
        ...cacheStatus
    }
    const queries= new URLSearchParams(dataForGettingMeta).toString()

    return `?${queries}`

}

export default _metaPageQueryGenerator