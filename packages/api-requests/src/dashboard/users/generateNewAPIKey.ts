import AxiosInstance from "../../lib/AxiosInstance";

const generateNewAPIKey = async ()=>{
    return await AxiosInstance.post('/api/admin/users/newAPIKey',{token: localStorage.wt})
}

export default generateNewAPIKey;