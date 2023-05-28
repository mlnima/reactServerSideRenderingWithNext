import AxiosInstance from "../lib/AxiosInstance";

export const dashboardAPIRequestGetSettings = async (settings:string[])=>{
    const settingsQuery = settings.map((setting) => `setting=${setting}`).join('&')
    // return await AxiosInstance.get(`/api/admin/settings/getMultipleSetting?setting=identity&setting=initialSettings&setting=design&setting=adminSettings&setting=membershipSettings&token=${localStorage.wt}`)
    return await AxiosInstance.get(`/api/admin/settings/getMultipleSetting?${settingsQuery}&token=${localStorage.wt}`)
}

export const dashboardAPIRequestUpdateSetting = async (type:string,data:{})=>{
    return await AxiosInstance.post('/api/admin/settings/update',{type,data,token: localStorage.wt})
}
