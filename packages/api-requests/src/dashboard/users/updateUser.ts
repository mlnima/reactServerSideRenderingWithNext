import AxiosInstance from "../../lib/AxiosInstance";

const updateUser = async (data)=>{
    return await AxiosInstance.post('/api/v1/users/updateUserData',{data,token: localStorage.wt})
}

export default updateUser;