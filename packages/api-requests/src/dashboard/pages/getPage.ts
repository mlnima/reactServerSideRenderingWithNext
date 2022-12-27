import AxiosInstance from "../../lib/AxiosInstance";

const getPage = async (_id:string)=>{
    return await AxiosInstance.post('/api/admin/pages/getPageData',{_id,token: localStorage.wt})
}

export default getPage; 