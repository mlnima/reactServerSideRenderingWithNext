import AxiosInstance from "../../lib/AxiosInstance";

const postNewComment = async (commentData) => {
    return await AxiosInstance.post(`/api/v1/posts/newComment`, {...commentData,});
}
export default postNewComment;