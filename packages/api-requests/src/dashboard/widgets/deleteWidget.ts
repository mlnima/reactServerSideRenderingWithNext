
import AxiosInstance from "../../lib/AxiosInstance";

const deleteWidget = async (_id)=>{
    return await AxiosInstance.post('/api/admin/widgets/adminDeleteWidget',{_id,token: localStorage.wt})
}

export default deleteWidget;