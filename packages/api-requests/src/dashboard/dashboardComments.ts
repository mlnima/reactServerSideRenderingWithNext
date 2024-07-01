import AxiosInstance from "../lib/AxiosInstance";

export const dashboardAPIRequestGetComments = async (queriesData:string)=>{
    return await AxiosInstance.get(`/api/dashboard/comment${queriesData}`)
}

export const  dashboardAPIRequestDeleteComments = async (commentsIds:string[])=>{
    const ids = commentsIds.join(',');
    return await AxiosInstance.delete(`/api/dashboard/comment`, {
        params: {
            commentsIds: ids
        }
    });
}
