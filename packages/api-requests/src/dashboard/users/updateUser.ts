import AxiosInstance from "../../lib/AxiosInstance";

const updateUser = async (data)=>{
    return await AxiosInstance.post('/api/v1/users/updateUser',{data,token: localStorage.wt})
}

export default updateUser;