import AxiosInstance from "../../lib/AxiosInstance";

const updateChatroom  = async (data)=>{
    return await AxiosInstance.patch(`/api/admin/chatrooms/updateChatroom`,{data,token:localStorage.wt})
}

export default updateChatroom;