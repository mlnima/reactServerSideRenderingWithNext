import AxiosInstance from "../../lib/AxiosInstance";

const createFileOrFolder = async (data)=>{
    return await AxiosInstance.post('/expressServer/files/admin-newFolder',{data,token: localStorage.wt})
}

export default createFileOrFolder;