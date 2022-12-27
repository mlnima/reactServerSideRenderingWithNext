import AxiosInstance from "../../lib/AxiosInstance";

const createNewPost = async (postData)=>{
    return await AxiosInstance.post('/api/admin/posts/createNewPost',{postData,token: localStorage.wt})
}

export default createNewPost;