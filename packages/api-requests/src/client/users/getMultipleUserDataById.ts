import AxiosInstance from "../../lib/AxiosInstance";

const getMultipleUserDataById = async (usersList)=>{
    return await AxiosInstance.post(`/api/v1/users/getMultipleUserDataById`, {usersList})
}

export default getMultipleUserDataById;