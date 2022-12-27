
import AxiosInstance from "../../lib/AxiosInstance";

const deletePage = async (id:string)=>{
    return await AxiosInstance.post('/api/admin/pages/deleteCustomPage',{id,token: localStorage.wt})
}

export default deletePage;