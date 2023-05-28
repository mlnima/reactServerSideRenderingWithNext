import AxiosInstance from "../lib/AxiosInstance";

export const dashboardAPIRequestCreateChatroom  = async (data:{})=>{
    return await AxiosInstance.post(`/api/admin/chatrooms/createChatroom`,{
        data,
        token:localStorage.wt
    })
}

export const dashboardAPIRequestDeleteChatroom  = async (_id:string)=>{
    return await AxiosInstance.delete(`/api/admin/chatrooms/deleteChatroom?_id=${_id}&token=${localStorage.wt}`)
}

export const dashboardAPIRequestGetChatroom  = async (_id:string)=>{
    return await AxiosInstance.get(`/api/admin/chatrooms/getChatroom?_id=${_id}&token=${localStorage.wt}`)
}

export const dashboardAPIRequestGetChatrooms  = async ()=>{
    return await AxiosInstance.get(`/api/admin/chatrooms/getChatrooms?token=${localStorage.wt}`)
}

export const dashboardAPIRequestUpdateChatroom  = async (data:{})=>{
    return await AxiosInstance.patch(`/api/admin/chatrooms/updateChatroom`,{data,token:localStorage.wt})
}