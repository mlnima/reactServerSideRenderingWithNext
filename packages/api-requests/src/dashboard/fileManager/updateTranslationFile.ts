import AxiosInstance from "../../lib/AxiosInstance";

const updateTranslationFile = async (path, data)=>{
    return await AxiosInstance.post('/api/admin/fileManager/updateTranslationsFile',{path, data,token: localStorage.wt})
}

export default updateTranslationFile;