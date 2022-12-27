
import AxiosInstance from "../../lib/AxiosInstance";

const createFolder = async (folderName,folderPath)=>{
    return await AxiosInstance.post('/expressServer/files/admin-newFolder',{folderName,folderPath,token: localStorage.wt})
}

export default createFolder;