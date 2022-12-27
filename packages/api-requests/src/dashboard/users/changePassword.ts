
import AxiosInstance from "../../lib/AxiosInstance";

const changePassword = async (oldPass, newPass, newPass2)=>{
    return await AxiosInstance.post('/api/v1/users/resetPassword',{oldPass, newPass, newPass2,token: localStorage.wt})
}

export default changePassword;