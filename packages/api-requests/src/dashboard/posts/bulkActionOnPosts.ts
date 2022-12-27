import AxiosInstance from "../../lib/AxiosInstance";

const bulkActionOnPosts = async (ids, status)=>{
    return await AxiosInstance.post('/api/admin/posts/postsBulkAction',{ids, status,token: localStorage.wt})
}

export default bulkActionOnPosts;