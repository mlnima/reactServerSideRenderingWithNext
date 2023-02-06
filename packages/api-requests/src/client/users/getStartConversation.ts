
import AxiosInstance from "../../lib/AxiosInstance";

const getStartConversation = async (_id)=>{
    return await AxiosInstance.post(`/api/v1/users/getStartConversation`, {_id,token: localStorage.wt})
}

export default getStartConversation;