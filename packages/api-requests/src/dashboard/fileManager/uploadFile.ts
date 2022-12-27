
import AxiosInstance from "../../lib/AxiosInstance";

const uploadFile = async (file)=>{
    return await AxiosInstance.post('/api/admin/fileManager/uploadFile',file)
}

export default uploadFile;