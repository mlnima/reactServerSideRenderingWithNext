import AxiosInstance from "../lib/AxiosInstance";

export const dashboardAPIRequestBulkActionOnMetas = async (type, status, ids)=>{
    return await AxiosInstance.post('/api/admin/posts/bulkAction',{type, status, ids,token: localStorage.wt})
}

export const dashboardAPIRequestDeleteMeta = async (_id)=>{
    return await AxiosInstance.post('/api/admin/posts/deleteMeta',{_id,token: localStorage.wt})
}

export const dashboardAPIRequestGetMeta = async (_id)=>{
    return await AxiosInstance.get(`/api/admin/posts/getMeta?_id=${_id}&token=${localStorage.wt}`)
}

export const dashboardAPIRequestGetMetas = async (queriesData)=>{
    return await AxiosInstance.get(`/api/admin/posts/getMetas${queriesData}&token=${localStorage.wt}`)
}

export const dashboardAPIRequestSetMetaThumbnailsAndCount = async (type)=>{
    return await AxiosInstance.get(`/api/admin/posts/setMetaThumbnailsAndCount?token=${localStorage.wt}${type ? `&type=${type}` : ''}`)
}

export const dashboardAPIRequestUpdateMeta = async (data)=>{
    return await AxiosInstance.post('/api/admin/posts/updateMeta',{data,token: localStorage.wt})
}