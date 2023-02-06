import AxiosInstance from "../../lib/AxiosInstance";

const resetPassword = async (data)=>{
    return await AxiosInstance.post(`/api/v1/users/resetPassword`,{data, token: localStorage.wt})
}

export default resetPassword;