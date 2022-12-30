import AxiosInstance from "../../lib/AxiosInstance";

const getSignedInUserData = async (fields)=>{
    return await AxiosInstance.post(`/api/v1/users/getSignedInUserData`,{fields, token: localStorage.wt})
}

export default getSignedInUserData;