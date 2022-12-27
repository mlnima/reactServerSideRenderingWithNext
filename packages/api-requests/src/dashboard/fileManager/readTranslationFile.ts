
import AxiosInstance from "../../lib/AxiosInstance";

const readTranslationFile = async (path)=>{
    return await AxiosInstance.post('/api/admin/fileManager/readTranslationsFile',{path,token: localStorage.wt})
}

export default readTranslationFile;