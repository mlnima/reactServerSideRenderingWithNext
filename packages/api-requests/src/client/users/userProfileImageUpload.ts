import AxiosInstance from "../../lib/AxiosInstance";

const userProfileImageUpload = async (image)=>{
    return await AxiosInstance.post(`/api/v1/fileManager/userProfileImageUpload`,image)
}

export default userProfileImageUpload;