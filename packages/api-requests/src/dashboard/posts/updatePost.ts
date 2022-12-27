import AxiosInstance from "../../lib/AxiosInstance";

const updatePost = async (postData)=>{
    return await AxiosInstance.post('/api/admin/posts/updatePost',{postData,token: localStorage.wt})
}

export default updatePost;