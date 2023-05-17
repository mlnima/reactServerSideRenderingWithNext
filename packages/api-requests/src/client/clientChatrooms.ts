import AxiosInstance from "../lib/AxiosInstance";

export const clientAPIRequestGetChatroom  = async (identifier:string)=>{
    return await AxiosInstance.get(`/api/v1/chatrooms/getChatroom?identifier=${identifier}`)
}

