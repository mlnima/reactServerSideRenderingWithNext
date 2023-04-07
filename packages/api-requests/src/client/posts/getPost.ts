import {mongoIdValidator} from "custom-util";
import AxiosInstance from "../../lib/AxiosInstance";

const getPost = async (identifier:string) => {
    const queryGeneratorData = mongoIdValidator(identifier) ? {_id: identifier} : {title: identifier}
    const _id = queryGeneratorData._id ? {_id: queryGeneratorData._id} : {}
    const title = queryGeneratorData.title ? {title: encodeURIComponent(queryGeneratorData.title)} : {}
    const queriesDataObject  = {..._id,...title}
    //@ts-ignore
    const queries= `?${new URLSearchParams(queriesDataObject).toString()}`

    return await AxiosInstance.get(`/api/v1/posts/getPost${queries}`)
}

export default getPost;