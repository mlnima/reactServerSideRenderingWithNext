import AxiosInstance from "../lib/AxiosInstance";

export const dashboardAPIRequestCreateNewPage = async (pageData:any)=>{
    return await AxiosInstance.post('/api/admin/pages/createNewPage',{pageData,token: localStorage.wt})
}

export const dashboardAPIRequestDeletePage = async (id:string)=>{
    return await AxiosInstance.post('/api/admin/pages/deleteCustomPage',{id,token: localStorage.wt})
}

export const dashboardAPIRequestGetPage = async (_id:string)=>{
    return await AxiosInstance.post('/api/admin/pages/getPageData',{_id,token: localStorage.wt})
}

export const dashboardAPIRequestGetPages = async (queriesData:any)=>{
    return await AxiosInstance.post('/api/admin/pages/getPagesData',{...queriesData,token: localStorage.wt})
}

export const dashboardAPIRequestUpdatePage = async (pageData:any)=>{
    return await AxiosInstance.post('/api/admin/pages/updatePage',{pageData,token: localStorage.wt})
}