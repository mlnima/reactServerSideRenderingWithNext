import AxiosInstance from "../../../lib/AxiosInstance";
import {reduceArrayOfDataToIds} from "custom-util";

const createNewPost = async (data) => {
    const comments = data.comments ? {comments: reduceArrayOfDataToIds(data.comments)} : {}
    const categories = data.categories ? {categories: reduceArrayOfDataToIds(data.categories)} : {}
    const tags = data.tags ? {tags: reduceArrayOfDataToIds(data.tags)} : {}
    const actors = data.actors ? {actors: reduceArrayOfDataToIds(data.actors)} : {}
    const postData = {
        ...data,
        ...comments,
        ...categories,
        ...tags,
        ...actors
    }
    const body = {
        postData,
        token: localStorage.wt
    };
    return await AxiosInstance.post(`/api/v1/posts/userCreateNewPost`, body)
}
export default createNewPost;