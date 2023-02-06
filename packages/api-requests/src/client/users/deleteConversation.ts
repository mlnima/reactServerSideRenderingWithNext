
import AxiosInstance from "../../lib/AxiosInstance";

const deleteConversation = async (_id)=>{
    return await AxiosInstance.post(`/api/v1/users/deleteConversation?_id=${_id}&token=${localStorage.wt}`)
}

export default deleteConversation;