import AxiosInstance from "../../lib/AxiosInstance";

const getTags = async (queryData)=>{

    const sort = queryData?.sort ? {sort: queryData?.sort} : {}
    const keyword = queryData?.keyword ? {keyword: encodeURIComponent(queryData?.keyword as string)} : {}
    const startWith = queryData?.startWith ? {startWith: queryData?.startWith} : {}
    const size = queryData.size ? {size: queryData.size} : {}
    const page = queryData?.page ? {page: queryData?.page} : {}
    const lang = queryData?.lang ? {lang: queryData?.lang} : {}
    const dataForGettingMeta = {
        metaType:'tags',
        ...lang,
        ...page,
        ...size,
        ...startWith,
        ...sort,
        ...keyword,
    }
    const queries = new URLSearchParams(dataForGettingMeta as {}).toString()

    return  await AxiosInstance.get(`/api/v1/posts/tags?${queries}`)
}

export default getTags;