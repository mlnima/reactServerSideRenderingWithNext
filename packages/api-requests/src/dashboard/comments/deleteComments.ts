import AxiosInstance from "../../lib/AxiosInstance";

const deleteComments = async (commentsIds)=>{
    return await AxiosInstance.post(`/api/admin/posts/deleteComments`, {
        commentsIds: commentsIds,
        token: localStorage.wt
    })
}

export default deleteComments;