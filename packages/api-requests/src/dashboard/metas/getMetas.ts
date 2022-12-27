import AxiosInstance from "../../lib/AxiosInstance";

const getMetas = async (queriesData)=>{
    return await AxiosInstance.get(`/api/admin/posts/getMetas${queriesData}&token=${localStorage.wt}`)
}

export default getMetas;