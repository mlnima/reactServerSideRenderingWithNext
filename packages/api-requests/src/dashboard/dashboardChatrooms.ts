import AxiosInstance from "../lib/AxiosInstance";

export const dashboardAPIRequestCreateChatroom  = async (data:{})=>{
    return await AxiosInstance.post(`/api/dashboard/chatroom`,{
        data
    })
}

export const dashboardAPIRequestDeleteChatroom  = async (_id:string)=>{
    return await AxiosInstance.delete(`/api/dashboard/chatroom`,{
        params:{
            _id
        }
    })
}

export const dashboardAPIRequestGetChatroom  = async (_id:string)=>{
    return await AxiosInstance.get(`/api/dashboard/chatroom`,{
        params:{
            _id
        }
    })
}

export const dashboardAPIRequestGetChatrooms  = async ()=>{
    return await AxiosInstance.get(`/api/dashboard/chatrooms`)
}

export const dashboardAPIRequestUpdateChatroom  = async (data:{})=>{
    return await AxiosInstance.put(`/api/dashboard/chatroom`,{data})
}