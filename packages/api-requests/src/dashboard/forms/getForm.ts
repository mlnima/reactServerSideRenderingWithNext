import AxiosInstance from "../../lib/AxiosInstance";

const getForm = async (_id)=>{
    return await AxiosInstance.get(`/api/admin/forms/getForm?_id=${_id}&token=${localStorage.wt}`)
}

export default getForm;