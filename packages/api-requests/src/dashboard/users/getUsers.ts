import AxiosInstance from "../../lib/AxiosInstance";

const getUsers = async (queriesData)=>{

    return await AxiosInstance.get(`/api/admin/users/getUsers${queriesData}&token=${localStorage.wt}`)
}

export default getUsers;