import AxiosInstance from "../../lib/AxiosInstance";

const updatePage = async (pageData:any)=>{
    return await AxiosInstance.post('/api/admin/pages/updatePage',{pageData,token: localStorage.wt})
}

export default updatePage;