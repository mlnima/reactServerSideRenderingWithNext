import AxiosInstance from "../../lib/AxiosInstance";

const createChatroom  = async (data:{})=>{
    return await AxiosInstance.post(`/api/admin/chatrooms/createChatroom`,{
        data,
        token:localStorage.wt
    })
}

export default createChatroom;