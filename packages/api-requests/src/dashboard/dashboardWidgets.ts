import AxiosInstance from "../lib/AxiosInstance";

export const dashboardAPIRequestCreateNewWidget = async (data:{})=>{
    return await AxiosInstance.post('/api/dashboard/widget',{data,token: localStorage.wt})
}

export const dashboardAPIRequestDeleteWidget = async (_id:string)=>{
    return await AxiosInstance.delete('/api/dashboard/widget',{
        params:{
            _id
        }
    })
}

export const dashboardAPIRequestGetWidgets = async ()=>{
    return await AxiosInstance.get(`/api/dashboard/widget`)
}

export const dashboardAPIRequestUpdateWidget = async (widgetData:{})=>{
    return await AxiosInstance.put('/api/dashboard/widget',{widgetData})
}