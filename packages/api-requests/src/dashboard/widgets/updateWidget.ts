import AxiosInstance from "../../lib/AxiosInstance";

const updateWidget = async (widgetData)=>{
    return await AxiosInstance.post('/api/admin/widgets/updateWidget',{widgetData,token: localStorage.wt})
}

export default updateWidget;