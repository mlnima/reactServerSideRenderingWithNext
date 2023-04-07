import AxiosInstance from "../../lib/AxiosInstance";

const getSettings = async (requireSettings:string[])=>{
    const settingsQuery = requireSettings.map((setting) => `setting=${setting}`).join('&');
    return await AxiosInstance.get(`/api/v1/settings/getSettings?${settingsQuery}`);
}

export default getSettings;