import AxiosInstance from "../../lib/AxiosInstance";

const deleteForm = async (formId)=>{
    return await AxiosInstance.post('/api/admin/forms/getFormData',{_id:formId,token: localStorage.wt})
}

export default deleteForm;