import AxiosInstance from "../../lib/AxiosInstance";

const updateSetting = async (type,data)=>{
    return await AxiosInstance.post('/api/admin/settings/update',{type,data,token: localStorage.wt})
}

export default updateSetting;