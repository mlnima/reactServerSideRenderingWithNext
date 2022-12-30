
import AxiosInstance from "../../lib/AxiosInstance";

const loginUser = async (username, password)=>{
    return await AxiosInstance.post(`/api/v1/users/login`,{username, password, token: localStorage.wt})
}

export default loginUser;