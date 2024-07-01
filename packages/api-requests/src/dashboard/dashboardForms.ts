import AxiosInstance from "../lib/AxiosInstance";

export const dashboardAPIRequestDeleteForm = async (_id:string)=>{
    return await AxiosInstance.delete(`/api/dashboard/form`,{
        params:{
            _id
        }
    })
}

export const dashboardAPIRequestGetForm = async (_id:string)=>{
    return await AxiosInstance.get(`/api/dashboard/form`,{
        params:{
            _id
        }
    })
}

export const dashboardAPIRequestGetForms = async (queriesData:string)=>{
    return await AxiosInstance.get(`/api/dashboard/forms${queriesData}`)
}
