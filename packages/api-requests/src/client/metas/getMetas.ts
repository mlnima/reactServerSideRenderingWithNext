import {queryUniquer} from 'custom-util'
import AxiosInstance from "../../lib/AxiosInstance";

const getMetas = async (currentQuery,metaType) => {
    const sort = currentQuery?.sort ? {sort: currentQuery?.sort} : {}
    const keyword = currentQuery?.keyword ? {keyword: encodeURIComponent(queryUniquer(currentQuery?.keyword))} : {}
    const startWith = currentQuery?.startWith ? {startWith: currentQuery?.startWith} : {}
    const size = currentQuery.size ? {size: currentQuery.size} : {}
    const page = currentQuery?.page ? {page: currentQuery?.page} : {}
    const lang = currentQuery?.lang ? {lang: currentQuery?.lang} : {}

    const dataForGettingMeta = {
        metaType,
        ...lang,
        ...page,
        ...size,
        ...startWith,
        ...sort,
        ...keyword,
    }

    return await AxiosInstance.get(`/api/v1/posts/getMetas?${new URLSearchParams(dataForGettingMeta as {}).toString()}` )
}

export default getMetas;