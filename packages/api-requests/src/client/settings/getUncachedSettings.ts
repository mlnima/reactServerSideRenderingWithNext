import AxiosInstance from "../../lib/AxiosInstance";

const getUncachedSettings = async (requireSettings)=>{
    const settingsQuery = `?${requireSettings.map(s => 'setting=' + s).join('&')}`;
    return await AxiosInstance.get(`/api/admin/settings/getMultipleSetting${settingsQuery}&token=${localStorage.wt}`);

}

export default getUncachedSettings;

