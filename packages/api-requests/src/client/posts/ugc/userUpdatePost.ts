import AxiosInstance from "../../../lib/AxiosInstance";
import {reduceArrayOfDataToIds} from "custom-util";

const userUpdatePost = async (editedPost) => {
    const comments = editedPost.comments ? {comments: reduceArrayOfDataToIds(editedPost.comments)} : {}
    const categories = editedPost.categories ? {categories: reduceArrayOfDataToIds(editedPost.categories)} : {}
    const tags = editedPost.tags ? {tags: reduceArrayOfDataToIds(editedPost.tags)} : {}
    const actors = editedPost.actors ? {actors: reduceArrayOfDataToIds(editedPost.actors)} : {}
    const author = editedPost.author ? {author: editedPost.author?._id} : {}

    const postData = {
        ...editedPost,
        ...comments,
        ...categories,
        ...author,
        ...tags,
        ...actors
    }

    const body = {
        postData,
        token: localStorage.wt
    };

    return await AxiosInstance.post(`/api/v1/posts/userUpdatePost`, body)
}
export default userUpdatePost;