

const _metaPageQueryGenerator = (queryData,metaType) =>{
    const sort = queryData?.sort ? {sort: queryData?.sort}: {}
    const keyword = queryData?.keyword ? { keyword: encodeURIComponent(queryData?.keyword)}: {}
    const dataForGettingMeta = {
        metaType,
        page: queryData?.page || 1,
        size: queryData.size ,
        startWith: queryData?.startWith || 'any',
        lang: queryData?.lang || 'default',
        status: queryData.status || 'published',
        ...sort,
        ...keyword,
    }
    const queries= new URLSearchParams(dataForGettingMeta).toString()

    return `?${queries}`

}

export default _metaPageQueryGenerator