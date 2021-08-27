const _postPageQueryGenerator = (queryData,cache)=>{
    const id = queryData._id ? {_id: queryData._id} : {}
    const title = queryData.title ? {title: encodeURIComponent(queryData.title)} : {}
    const cacheStatus = cache ? {cache} : {}
    const queriesDataObject  = {...id,...title,...cacheStatus}
    const queries= new URLSearchParams(queriesDataObject).toString()

    return `?${queries}`
}

export default _postPageQueryGenerator