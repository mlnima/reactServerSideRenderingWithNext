import AxiosInstance from "../lib/AxiosInstance";

const commonAPIRequestClearCaches = async ()=>{
    return await AxiosInstance.get(`/api/admin/settings/clearCaches`)
}

export default commonAPIRequestClearCaches;