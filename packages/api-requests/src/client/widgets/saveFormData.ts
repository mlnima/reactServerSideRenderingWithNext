import AxiosInstance from "../../lib/AxiosInstance";

const saveFormData = async (data)=>{
    return await AxiosInstance.post(`/api/v1/forms/saveFormData`,{data})
}

export default saveFormData;