import AxiosInstance from "../../lib/AxiosInstance";

const getPost  = async (_id:string)=>{
    return await AxiosInstance.get(`/api/admin/posts/getPost?_id=${_id}&token=${localStorage.wt}`)
}

export default getPost;