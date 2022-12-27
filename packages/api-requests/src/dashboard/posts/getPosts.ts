import AxiosInstance from "../../lib/AxiosInstance";

const getPosts = async (queriesData)=>{
    return await AxiosInstance.get(`/api/admin/posts/getPosts${queriesData}&token=${localStorage.wt}`)
}

export default getPosts;