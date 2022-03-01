import Axios from "@_variables/util/Axios";

const getMetaSuggestion = async (type,startWith) =>{
    return await Axios.get(`/api/v1/posts/metaSuggestion?metaType=${type}&startWith=${startWith}`)
}

export default getMetaSuggestion