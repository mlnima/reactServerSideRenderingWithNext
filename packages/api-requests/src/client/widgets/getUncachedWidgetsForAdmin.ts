import AxiosInstance from "../../lib/AxiosInstance";

const getUncachedWidgetsForAdmin = async ()=>{
    return await AxiosInstance.get(`/api/admin/widgets/getWidgets?token=${localStorage.wt}`)
}

export default getUncachedWidgetsForAdmin;