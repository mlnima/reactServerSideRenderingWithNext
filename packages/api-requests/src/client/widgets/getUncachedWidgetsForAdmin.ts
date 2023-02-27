import AxiosInstance from "../../lib/AxiosInstance";

const getUncachedWidgetsForAdmin = async ()=>{
    return await AxiosInstance.get(`/api/admin/widgets/getPopulatedWidgets?token=${localStorage.wt}`)
}

export default getUncachedWidgetsForAdmin;