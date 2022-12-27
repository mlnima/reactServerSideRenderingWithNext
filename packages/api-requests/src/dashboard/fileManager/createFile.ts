import AxiosInstance from "../../lib/AxiosInstance";

const createFile = async (fileName, filePath)=>{
    return await AxiosInstance.post('/expressServer/files/admin-newFile',{fileName, filePath,token: localStorage.wt})
}

export default createFile;