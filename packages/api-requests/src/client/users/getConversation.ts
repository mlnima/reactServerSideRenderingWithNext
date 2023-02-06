import AxiosInstance from "../../lib/AxiosInstance";

const getConversation = async (_id,loadAmount)=>{
    return await AxiosInstance.post(`/api/v1/users/getConversation`, {_id,loadAmount,token: localStorage.wt})
}

export default getConversation;