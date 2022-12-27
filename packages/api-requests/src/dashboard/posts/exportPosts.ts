import AxiosInstance from "../../lib/AxiosInstance";

const exportPosts = async (data)=>{
    return await AxiosInstance.post('/api/admin/posts/exportPosts',{data,token: localStorage.wt})
}

export default exportPosts;