import AxiosInstance from "../../lib/AxiosInstance";

const getEditingPost = async (postId) => {
    const queries= new URLSearchParams({_id: postId}).toString();
    return await AxiosInstance.get(`/api/v1/posts/clientGetEditingPost?${queries}`);
}

export default getEditingPost;