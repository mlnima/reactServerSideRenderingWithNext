//getForms
import AxiosInstance from "../../lib/AxiosInstance";

const getForms = async (queriesData)=>{
    return await AxiosInstance.get(`/api/admin/forms/getForms${queriesData}&token=${localStorage.wt}`)
}

export default getForms;