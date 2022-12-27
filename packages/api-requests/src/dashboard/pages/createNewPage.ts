
import AxiosInstance from "../../lib/AxiosInstance";

const createNewPage = async (pageData:any)=>{
    return await AxiosInstance.post('/api/admin/pages/createNewPage',{pageData,token: localStorage.wt})
}

export default createNewPage;