import AxiosInstance from "../lib/AxiosInstance";

export const dashboardAPIRequestCreateNewPage = async (pageData:any)=>{
    return await AxiosInstance.post('/api/dashboard/page',{pageData,token: localStorage.wt})
}

export const dashboardAPIRequestDeletePage = async (_id:string)=>{
    return await AxiosInstance.delete('/api/admin/pages/deleteCustomPage',{
        params:{
            _id
        }
    })
}

export const dashboardAPIRequestGetPage = async (_id:string)=>{
    return await AxiosInstance.get('/dashboard/page',{
        params:{
            _id
        }
    })
}

export const dashboardAPIRequestGetPages = async (queriesData:any)=>{
    return await AxiosInstance.get('/api/dashboard/pages', {
        params:queriesData
    });
}

export const dashboardAPIRequestUpdatePage = async (pageData:any)=>{
    return await AxiosInstance.put('/api/dashboard/page',{pageData})
}