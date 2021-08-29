

const _metaPageQueryGenerator = (queryData,metaType,cache) =>{
    console.log(queryData)
    const sort = queryData?.sort ? {sort: queryData?.sort}: {}
    const keyword = queryData?.keyword ? { keyword: encodeURIComponent(queryData?.keyword)}: {}
    const cacheStatus = cache ? {cache} : {}
    const dataForGettingMeta = {
        metaType,
        page: queryData?.page || 1,
        size: queryData?.size || 60,
        startWith: queryData?.startWith || 'any',
        lang: queryData?.lang || 'default',
        status: 'published',
        ...sort,
        ...keyword,
        ...cacheStatus
    }
    const queries= new URLSearchParams(dataForGettingMeta).toString()

    return `?${queries}`

}

export default _metaPageQueryGenerator