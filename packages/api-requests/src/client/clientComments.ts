import AxiosInstance from "../lib/AxiosInstance";
export const clientAPIRequestDeleteCommentByAdmin = async (commentsIds:string[]) => {
    return await AxiosInstance.post(`/api/admin/posts/deleteComments`, {
        commentsIds,
        token: localStorage.wt
    })
}

export const clientAPIRequestGetPostComments = async (postId:string) => {
    return await AxiosInstance.get(`/api/v1/posts/getComments?onDocument=${postId}`)
}

export const clientAPIRequestPostNewComment = async (commentData) => {
    return await AxiosInstance.post(`/api/v1/posts/newComment`, {...commentData,});
}