import AxiosInstance from "../../lib/AxiosInstance";

const deleteForm = async (formId)=>{
    return await AxiosInstance.delete(`/api/admin/forms/deleteFormData?_id=${formId}&token=${localStorage.wt}`)
}

export default deleteForm;