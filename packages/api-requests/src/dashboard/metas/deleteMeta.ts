import AxiosInstance from "../../lib/AxiosInstance";

const deleteMeta = async (_id)=>{
    return await AxiosInstance.post('/api/admin/posts/deleteMeta',{_id,token: localStorage.wt})
}

export default deleteMeta;