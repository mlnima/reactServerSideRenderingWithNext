import AxiosInstance from "../../lib/AxiosInstance";

const getMeta = async (_id)=>{
    return await AxiosInstance.get(`/api/admin/posts/getMeta?_id=${_id}&token=${localStorage.wt}`)
}

export default getMeta;