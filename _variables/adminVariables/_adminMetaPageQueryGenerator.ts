import {NextRouter} from "next/router";

const _adminMetaPageQueryGenerator = (queryData: NextRouter['query'],metaType:string|string[]) =>{
    const sort = queryData?.sort ? {sort: queryData?.sort}: {}
    const keyword = queryData?.keyword ? { keyword: encodeURIComponent(queryData?.keyword as string)}: {}
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
    const queries= new URLSearchParams(dataForGettingMeta as {}).toString()

    return `?${queries}`

}

export default _adminMetaPageQueryGenerator