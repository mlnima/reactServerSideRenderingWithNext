import AxiosInstance from "../../lib/AxiosInstance";

const deleteFile = async (filePath)=>{
    return await AxiosInstance.post('/api/admin/fileManager/deleteFile',{filePath,token: localStorage.wt})
}

export default deleteFile;