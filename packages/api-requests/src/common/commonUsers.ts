import AxiosInstance from "../lib/AxiosInstance";

export const commonAPIRequestGetSignedInUserData = async (fields:string[])=>{
    return await AxiosInstance.post(`/api/v1/user/getSignedInUserData`,{fields, token: localStorage.wt})
}

export const commonAPIRequestLoginUser = async (username:string, password:string)=>{
    return await AxiosInstance.get(`/api/v1/user/login`,{
        params:{
            username,
            password
        }
    })
}