import AxiosInstance from "../../lib/AxiosInstance";

const getChatrooms  = async ()=>{
    return await AxiosInstance.get(`/api/admin/chatrooms/getChatrooms?token=${localStorage.wt}`)
}

export default getChatrooms;