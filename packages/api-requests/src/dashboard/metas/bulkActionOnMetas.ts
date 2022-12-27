
import AxiosInstance from "../../lib/AxiosInstance";

const bulkActionOnMetas = async (type, status, ids)=>{
    return await AxiosInstance.post('/api/admin/posts/bulkAction',{type, status, ids,token: localStorage.wt})
}

export default bulkActionOnMetas;