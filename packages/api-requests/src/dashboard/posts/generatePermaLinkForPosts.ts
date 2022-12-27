

import AxiosInstance from "../../lib/AxiosInstance";

const generatePermaLinkForPosts = async (type)=>{
    return await AxiosInstance.get(`/api/admin/posts/generatePermaLinkForPosts?token=${localStorage.wt}${type ? `&type=${type}` : ''}`)
}

export default generatePermaLinkForPosts;