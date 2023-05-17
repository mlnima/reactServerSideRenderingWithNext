import AxiosInstance from "../lib/AxiosInstance";

export const dashboardAPIRequestCreateNewWidget = async (data)=>{
    return await AxiosInstance.post('/api/admin/widgets/createWidget',{data,token: localStorage.wt})
}

export const dashboardAPIRequestDeleteWidget = async (_id)=>{
    return await AxiosInstance.post('/api/admin/widgets/adminDeleteWidget',{_id,token: localStorage.wt})
}

export const dashboardAPIRequestGetWidgets = async ()=>{
    return await AxiosInstance.get(`/api/admin/widgets/getWidgets?token=${localStorage.wt}`)
}

export const dashboardAPIRequestUpdateWidget = async (widgetData)=>{
    return await AxiosInstance.post('/api/admin/widgets/updateWidget',{widgetData,token: localStorage.wt})
}