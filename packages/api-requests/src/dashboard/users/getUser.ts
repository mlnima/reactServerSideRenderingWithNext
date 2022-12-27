import AxiosInstance from "../../lib/AxiosInstance";

const getUser = async (_id)=>{
    return await AxiosInstance.post(`/api/admin/users/getUser`,{
        _id,
        token: localStorage.wt
    })
}

export default getUser;