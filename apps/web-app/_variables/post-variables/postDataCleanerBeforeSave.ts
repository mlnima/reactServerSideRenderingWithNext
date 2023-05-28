import {reduceArrayOfDataToIds} from "custom-util";
import {Post} from "typescript-types";
import {PostRaw} from "typescript-types";

const postDataCleanerBeforeSave = (postData:Post) =>{
    const comments = postData.comments ? {comments: reduceArrayOfDataToIds(postData.comments)} : {}
    const categories = postData.categories ? {categories: reduceArrayOfDataToIds(postData.categories)} : {}
    const tags = postData.tags ? {tags: reduceArrayOfDataToIds(postData.tags)} : {}
    const actors = postData.actors ? {actors: reduceArrayOfDataToIds(postData.actors)} : {}
    //@ts-ignore
    const author = postData.author ? {author: postData.author?._id} : {}

    return {
        ...postData,
        ...comments,
        ...categories,
        ...author,
        ...tags,
        ...actors
    } as PostRaw
}

export default postDataCleanerBeforeSave;