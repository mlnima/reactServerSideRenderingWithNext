import AxiosInstance from "../lib/AxiosInstance";



export const dashboardAPIRequestGetComments = async (queriesData:string)=>{
    return await AxiosInstance.get(`/api/admin/posts/getComments${queriesData}&token=${localStorage.wt}`)
}

export const  dashboardAPIRequestDeleteComments = async (commentsIds:string)=>{
    return await AxiosInstance.post(`/api/admin/posts/deleteComments`, {
        commentsIds: commentsIds,
        token: localStorage.wt
    })
}