import AxiosInstance from "../../lib/AxiosInstance";

const getMetaSuggestion = async (type:string,startWith:string) =>{
    return await AxiosInstance.get(`/api/v1/posts/metaSuggestion?metaType=${type}&startWith=${startWith}`)
}

export default getMetaSuggestion