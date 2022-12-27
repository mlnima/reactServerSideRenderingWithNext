
import AxiosInstance from "../../lib/AxiosInstance";

const setMetaThumbnailsAndCount = async (type)=>{
    return await AxiosInstance.get(`/api/admin/posts/setMetaThumbnailsAndCount?token=${localStorage.wt}${type ? `&type=${type}` : ''}`)
}

export default setMetaThumbnailsAndCount;