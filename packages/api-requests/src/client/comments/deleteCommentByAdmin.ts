import AxiosInstance from "../../lib/AxiosInstance";

const deleteCommentByAdmin = async (commentsIds:string[]) => {
    return await AxiosInstance.post(`/api/admin/posts/deleteComments`, {
        commentsIds,
        token: localStorage.wt
    })
}
export default deleteCommentByAdmin;