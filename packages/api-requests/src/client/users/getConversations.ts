import AxiosInstance from "../../lib/AxiosInstance";

const getConversations = async (_id)=>{
    return await AxiosInstance.post(`/api/v1/users/getConversations`, {_id,token: localStorage.wt})
}

export default getConversations;