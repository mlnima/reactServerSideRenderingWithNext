import AxiosInstance from "../lib/AxiosInstance";

const clearCaches = async ()=>{
    return await AxiosInstance.get(`/api/admin/settings/clearCaches?token=${localStorage.wt}`)
}

export default clearCaches;