import AxiosInstance from "../../lib/AxiosInstance";

const updatePost = async (data) => {
    return await AxiosInstance.post(`/api/v1/posts/updatePost`, {data,token: localStorage.wt});
}
export default updatePost;