//getPages
import AxiosInstance from "../../lib/AxiosInstance";

const getPages = async (queriesData:any)=>{
    return await AxiosInstance.post('/api/admin/pages/getPagesData',{...queriesData,token: localStorage.wt})
}

export default getPages;