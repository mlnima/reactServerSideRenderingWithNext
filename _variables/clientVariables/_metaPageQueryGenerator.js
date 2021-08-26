

const _metaPageQueryGenerator = (queryData,metaType,cache) =>{
    const sort = queryData?.sort ? {sort: queryData?.sort}: {}
    const keyword = queryData?.keyword ? { keyword: encodeURIComponent(queryData?.keyword)}: {}
    const dataForGettingMeta = {
        metaType,
        page: queryData?.page || 1,
        size: queryData?.size || 60,
        startWith: queryData?.startWith || 'any',
        lang: queryData?.lang || 'default',
        status: 'published',
        ...sort,
        ...keyword
    }
    const queries= new URLSearchParams(dataForGettingMeta).toString()

    return `?${queries}&cache=${cache}`

}

export default _metaPageQueryGenerator