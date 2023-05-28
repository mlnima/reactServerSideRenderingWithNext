import AxiosInstance from "../lib/AxiosInstance";

export const clientAPIRequestGetUncachedSettings = async (requireSettings:string[])=>{
    const settingsQuery = `?${requireSettings.map((setting:string) => 'setting=' + setting).join('&')}`;
    return await AxiosInstance.get(`/api/admin/settings/getMultipleSetting${settingsQuery}&token=${localStorage.wt}`);
}

export const clientAPIRequestGetSettings = async (requireSettings:string[])=>{
    const settingsQuery = requireSettings.map((setting) => `setting=${setting}`).join('&');
    return await AxiosInstance.get(`/api/v1/settings/getSettings?${settingsQuery}`);
}