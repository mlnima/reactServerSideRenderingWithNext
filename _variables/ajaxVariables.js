import axios from "axios";

export const updateSetting = async (type,data)=>{
    if (localStorage.wt){
        const body = {
            token: localStorage.wt,
            type,
            data
        };
        return await axios.post('http://localhost:3000/api/v1/settings/update',body)
    }
};
export const getSetting = async (type)=>{
        const body = {
            type,
        };
        return await axios.post('http://localhost:3000/api/v1/settings/get',body)
};