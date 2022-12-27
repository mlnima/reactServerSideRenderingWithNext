import AxiosInstance from "../../lib/AxiosInstance";

const updateMeta = async (data)=>{
    return await AxiosInstance.post('/api/admin/posts/updateMeta',{data,token: localStorage.wt})
}

export default updateMeta;