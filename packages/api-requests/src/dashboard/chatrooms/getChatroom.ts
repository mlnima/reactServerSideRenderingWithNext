//getChatroom

import AxiosInstance from "../../lib/AxiosInstance";

const getChatroom  = async (_id:string)=>{
    return await AxiosInstance.get(`/api/admin/chatrooms/getChatroom?_id=${_id}&token=${localStorage.wt}`)
}

export default getChatroom;