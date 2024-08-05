import AxiosInstance from "../lib/AxiosInstance";

export const dashboardAPIRequestGetSettings = async (settings:string[])=>{
    const settingsQuery = settings.map((setting) => `setting=${setting}`).join('&')
    return await AxiosInstance.get(`/api/dashboard/settings?${settingsQuery}`)
}

export const dashboardAPIRequestUpdateSetting = async (type:string,data:{})=>{
    return await AxiosInstance.put('/api/dashboard/setting',{type,data})
}
