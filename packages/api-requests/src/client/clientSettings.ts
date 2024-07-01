import AxiosInstance from "../lib/AxiosInstance";

export const clientAPIRequestGetUncachedSettings = async (requireSettings:string[])=>{
    const settingsQuery = `?${requireSettings.map((setting:string) => 'setting=' + setting).join('&')}`;
    return await AxiosInstance.get(`/api/dashboard/settings${settingsQuery}`);
}

// export const clientAPIRequestGetSettings = async (requireSettings:string[])=>{
//     const settingsQuery = requireSettings.map((setting) => `setting=${setting}`).join('&');
//     return await AxiosInstance.get(`/api/v1/settings/getSettings?${settingsQuery}`);
// }