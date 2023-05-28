import AxiosInstance from "../lib/AxiosInstance";

export const dashboardAPIRequestDeleteForm = async (formId:string)=>{
    return await AxiosInstance.delete(`/api/admin/forms/deleteFormData?_id=${formId}&token=${localStorage.wt}`)
}

export const dashboardAPIRequestGetForm = async (_id:string)=>{
    return await AxiosInstance.get(`/api/admin/forms/getForm?_id=${_id}&token=${localStorage.wt}`)
}

export const dashboardAPIRequestGetForms = async (queriesData:string)=>{
    return await AxiosInstance.get(`/api/admin/forms/getForms${queriesData}&token=${localStorage.wt}`)
}
