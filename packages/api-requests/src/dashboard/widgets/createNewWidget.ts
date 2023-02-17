import AxiosInstance from "../../lib/AxiosInstance";

const createNewWidget = async (data)=>{
    return await AxiosInstance.post('/api/admin/widgets/createWidget',{data,token: localStorage.wt})
}

export default createNewWidget;