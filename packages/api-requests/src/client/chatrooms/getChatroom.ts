import AxiosInstance from "../../lib/AxiosInstance";

const getChatroom  = async (identifier:string)=>{
    return await AxiosInstance.get(`/api/v1/chatrooms/getChatroom?identifier=${identifier}`)
}

export default getChatroom;