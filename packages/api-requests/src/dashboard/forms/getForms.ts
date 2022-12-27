//getForms
import AxiosInstance from "../../lib/AxiosInstance";

const getForms = async (queriesData)=>{
    return await AxiosInstance.post('/api/admin/forms/getFormsData',{...queriesData,token: localStorage.wt})
}

export default getForms;