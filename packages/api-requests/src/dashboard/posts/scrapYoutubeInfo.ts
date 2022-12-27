
import AxiosInstance from "../../lib/AxiosInstance";

const scrapYoutubeInfo = async (url)=>{
    return await AxiosInstance.post('/api/admin/scrapper/scrapYoutubeInfo',{url,token: localStorage.wt})
}

export default scrapYoutubeInfo;