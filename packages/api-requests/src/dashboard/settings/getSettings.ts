import AxiosInstance from "../../lib/AxiosInstance";

const getSettings = async (settings:string[])=>{
    const settingsQuery = settings.map((setting) => `setting=${setting}`).join('&')
    // return await AxiosInstance.get(`/api/admin/settings/getMultipleSetting?setting=identity&setting=initialSettings&setting=design&setting=adminSettings&setting=membershipSettings&token=${localStorage.wt}`)
    return await AxiosInstance.get(`/api/admin/settings/getMultipleSetting?${settingsQuery}&token=${localStorage.wt}`)
}

export default getSettings;