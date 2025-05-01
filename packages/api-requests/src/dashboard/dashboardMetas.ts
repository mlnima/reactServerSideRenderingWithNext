import AxiosInstance from "../lib/AxiosInstance";

export const dashboardAPIRequestBulkActionOnMetas = async (type:string, status:string, ids:string)=>{
    return await AxiosInstance.post('/api/dashboard/bulkAction',{type, status, ids,token: localStorage.wt})
}

export const dashboardAPIRequestDeleteMeta = async (metaIds:string|string[])=>{
    return await AxiosInstance.delete('/api/dashboard/meta',{params:{metaIds}})
}

export const dashboardAPIRequestGetMeta = async (metaId:string)=>{
    return await AxiosInstance.get(`/api/dashboard/meta`,{params:{metaId}})
}

export const dashboardAPIRequestGetMetas = async (queriesData:string)=>{
    return await AxiosInstance.get(`/api/dashboard/metas${queriesData}`)
}

export const dashboardAPIRequestSetMetaThumbnailsAndCount = async (type?:string)=>{
    return await AxiosInstance.get(`/api/dashboard/meta/setMetaThumbnailsAndCount${type ? `?&type=${type}` : ''}`)
}

export const dashboardAPIRequestUpdateMeta = async (data:{})=>{
    return await AxiosInstance.put('/api/dashboard/meta',{data})
}

// export const dashboardAPIRequestSyncDuplicateMetas = async ()=>{
//     return await AxiosInstance.post('/api/admin/posts/syncDuplicateMetas',{token: localStorage.wt})
// }

export const dashboardDeleteDuplicateMetas = async ()=>{
    return await AxiosInstance.delete('/api/dashboard/meta/duplicate')
}
