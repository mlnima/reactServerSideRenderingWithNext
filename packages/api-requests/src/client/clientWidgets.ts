import AxiosInstance from "../lib/AxiosInstance";






export const clientAPIRequestSaveFormData = async (data:{})=>{
    return await AxiosInstance.post(`/api/v1/form`,{data})
}

// export const clientAPIRequestGetWidgets = async (widgets: string[], locale: string) => {
//     const widgetsQuery= `?${locale ? `&locale=${locale}` : ''}&${widgets.map(s => 'widget=' + s).join('&')}`
//
//     return await AxiosInstance.get(`/api/v1/widget${widgetsQuery}`)
// }

// export const clientAPIRequestGetUncachedWidgetsForAdmin = async ()=>{
//     return await AxiosInstance.get(`/api/admin/widgets/getPopulatedWidgets?token=${localStorage.wt}`)
// }