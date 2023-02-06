import AxiosInstance from "../../lib/AxiosInstance";

const registerUser = async (data)=>{
    return await AxiosInstance.post(`/api/v1/users/register`,data)
}

export default registerUser;