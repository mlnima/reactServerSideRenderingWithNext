
import AxiosInstance from "../../lib/AxiosInstance";

const getUserPreviewData = async (username, _id, fields)=>{
    return await AxiosInstance.post(`/api/v1/users/getUserPreviewData`,{username, _id, fields, token: localStorage.wt})
}

export default getUserPreviewData;