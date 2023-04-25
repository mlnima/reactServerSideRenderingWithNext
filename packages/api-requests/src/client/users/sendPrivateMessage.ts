import AxiosInstance from "../../lib/AxiosInstance";

interface SendPrivateMessageParams {
    senderId: string;
    receiverId: string;
    content: string;
}

const sendPrivateMessage = async (senderId, receiverId, content): Promise<void> => {
    return await AxiosInstance.post(`/api/v1/users/sendPrivateMessage`, {
        senderId,
        receiverId,
        content,
        token: localStorage.wt
    })
}

export default sendPrivateMessage;