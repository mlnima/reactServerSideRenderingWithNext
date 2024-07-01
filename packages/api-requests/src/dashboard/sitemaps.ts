import AxiosInstance from "../lib/AxiosInstance";

export const dashboardAPIRequestGenerateSiteMaps = async ()=>{
    return await AxiosInstance.get('/api/dashboard/generateSitemaps')
}
