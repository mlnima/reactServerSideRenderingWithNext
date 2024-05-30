import AxiosInstance from "../lib/AxiosInstance";

export const dashboardAPIRequestGenerateSiteMaps = async ()=>{
    return await AxiosInstance.post('/api/admin/sitemapsAndStaticAsset/generateSitemapsAndStaticAsset',{token: localStorage.wt})
}
