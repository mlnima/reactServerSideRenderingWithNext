import AxiosInstance from "../../lib/AxiosInstance";

const getForm = async (formId)=>{
    return await AxiosInstance.post('/api/admin/forms/getFormData',{_id:formId,token: localStorage.wt})
}

export default getForm;