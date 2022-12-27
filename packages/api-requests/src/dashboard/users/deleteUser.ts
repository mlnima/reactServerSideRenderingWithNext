import AxiosInstance from "../../lib/AxiosInstance";

const deleteUser = async (id)=>{
    return await AxiosInstance.post('/api/admin/users/deleteUser',{id,token: localStorage.wt})
}

export default deleteUser;