import AxiosInstance from "../../lib/AxiosInstance";

const readPath = async (path)=>{
    return await AxiosInstance.post('/api/admin/fileManager/readPath',{path,token: localStorage.wt})
}

export default readPath;