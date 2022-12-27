import AxiosInstance from "../../lib/AxiosInstance";

const getUsers = async (queriesData)=>{
    return await AxiosInstance.post(`/api/admin/users/getUsersList`,{
        data:queriesData,
        token: localStorage.wt
    })
}

export default getUsers;