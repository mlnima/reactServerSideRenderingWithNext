
import AxiosInstance from "../../lib/AxiosInstance";

const checkAndRemoveDeletedVideos = async ()=>{
    return await AxiosInstance.get(`/api/admin/posts/checkAndRemoveDeletedVideos?token=${localStorage.wt}`)
}

export default checkAndRemoveDeletedVideos;