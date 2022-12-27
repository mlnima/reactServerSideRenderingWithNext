import AxiosInstance from "../lib/AxiosInstance";

const clearCaches = async ()=>{
    return await AxiosInstance.post(`/api/admin/settings/clearCaches?token=${localStorage.wt}`)
}

export default clearCaches;