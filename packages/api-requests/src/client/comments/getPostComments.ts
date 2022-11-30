import AxiosInstance from "../../lib/AxiosInstance";

const getPostComments = async (postId:string) => {
    return await AxiosInstance.get(`/api/v1/posts/getComments?onDocument=${postId}`)
}

export default getPostComments;