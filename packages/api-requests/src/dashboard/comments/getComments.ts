import AxiosInstance from "../../lib/AxiosInstance";

const getComments = async (queriesData)=>{
    return await AxiosInstance.get(`/api/admin/posts/getComments${queriesData}&token=${localStorage.wt}`)
}

export default getComments;