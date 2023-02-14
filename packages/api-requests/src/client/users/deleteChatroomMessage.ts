
import AxiosInstance from "../../lib/AxiosInstance";

const deleteChatroomMessage = async (chatroomId,messageId)=>{
    return await AxiosInstance.delete(`/api/admin/chatrooms/deleteChatroomMessage?chatroomId=${chatroomId}&messageId=${messageId}&token=${localStorage.wt}`)
}

export default deleteChatroomMessage;