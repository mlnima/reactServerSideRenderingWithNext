import AxiosInstance from "../../lib/AxiosInstance";

const followUser = async (_id)=>{
    return await AxiosInstance.patch(`/api/v1/users/followUser`,{_id, token: localStorage.wt})
}

export default followUser;