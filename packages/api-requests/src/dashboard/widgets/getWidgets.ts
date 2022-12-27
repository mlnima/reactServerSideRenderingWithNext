
import AxiosInstance from "../../lib/AxiosInstance";

const getWidgets = async ()=>{
    return await AxiosInstance.get(`/api/admin/widgets/adminPanelGetWidgets?token=${localStorage.wt}`)
}

export default getWidgets;