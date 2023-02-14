import AxiosInstance from "../../lib/AxiosInstance";

const deleteChatroom  = async (_id:string)=>{
    return await AxiosInstance.delete(`/api/admin/chatrooms/deleteChatroom?_id=${_id}&token=${localStorage.wt}`)
}

export default deleteChatroom;