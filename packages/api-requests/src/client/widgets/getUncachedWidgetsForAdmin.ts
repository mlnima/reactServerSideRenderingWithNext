import AxiosInstance from "../../lib/AxiosInstance";

const getUncachedWidgetsForAdmin = async ()=>{
    return await AxiosInstance.get(`/api/admin/widgets/adminGetWidgets?token=${localStorage.wt}`)
}

export default getUncachedWidgetsForAdmin;