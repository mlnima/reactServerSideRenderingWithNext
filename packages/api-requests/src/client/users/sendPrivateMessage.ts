
import AxiosInstance from "../../lib/AxiosInstance";

const sendPrivateMessage = async (conversationId,messageBody)=>{
    return await AxiosInstance.post(`/api/v1/users/sendPrivateMessage`, {conversationId,messageBody,token: localStorage.wt})
}

export default sendPrivateMessage;