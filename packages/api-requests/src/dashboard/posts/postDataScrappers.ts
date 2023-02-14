import AxiosInstance from "../../lib/AxiosInstance";

const postDataScrappers = async (urlToScrap)=>{

    return await AxiosInstance.post('/api/admin/posts/postDataScrappers',{urlToScrap,token: localStorage.wt})

};

export default postDataScrappers;