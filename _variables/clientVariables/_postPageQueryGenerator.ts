const _postPageQueryGenerator = (queryData:{_id?:string,title?:string})=>{
    const _id = queryData._id ? {_id: queryData._id} : {}
    const title = queryData.title ? {title: encodeURIComponent(queryData.title)} : {}
    const queriesDataObject  = {..._id,...title}
    const queries= new URLSearchParams(queriesDataObject).toString()

    return `?${queries}`
}

export default _postPageQueryGenerator