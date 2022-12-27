import AxiosInstance from "../../lib/AxiosInstance";

const updateWidget = async (widgetData)=>{
    return await AxiosInstance.post('/api/admin/widgets/adminUpdateWidget',{widgetData,token: localStorage.wt})
}

export default updateWidget;