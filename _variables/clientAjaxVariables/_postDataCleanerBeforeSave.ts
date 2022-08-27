import {reduceArrayOfDataToIds} from "@_variables/_variables";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";

const _postDataCleanerBeforeSave = (postData:PostTypes) =>{
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
    }
}

export default _postDataCleanerBeforeSave