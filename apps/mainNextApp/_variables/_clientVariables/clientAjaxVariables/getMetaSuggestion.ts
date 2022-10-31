import Axios from "@_variables/Axios";

const getMetaSuggestion = async (type:string,startWith:string) =>{
    return await Axios.get(`/api/v1/posts/metaSuggestion?metaType=${type}&startWith=${startWith}`)
}

export default getMetaSuggestion