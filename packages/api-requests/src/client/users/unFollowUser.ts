import AxiosInstance from "../../lib/AxiosInstance";

const unFollowUser = async (_id)=>{
    return await AxiosInstance.patch(`/api/v1/users/unFollowUser`,{_id, token: localStorage.wt})
}

export default unFollowUser;