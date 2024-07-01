import AxiosInstance from "../lib/AxiosInstance";
import {NewComment} from "typescript-types";

export const clientAPIRequestGetPostComments = async (postId:string) => {
    return await AxiosInstance.get(`/api/v1/posts/getComments?onDocument=${postId}`)
}

export const clientAPIRequestPostNewComment = async (commentData:NewComment) => {
    return await AxiosInstance.post(`/api/v1/posts/newComment`, {...commentData});
}