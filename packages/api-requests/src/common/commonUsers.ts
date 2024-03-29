import AxiosInstance from "../lib/AxiosInstance";

export const commonAPIRequestGetSignedInUserData = async (fields:string[])=>{
    return await AxiosInstance.post(`/api/v1/users/getSignedInUserData`,{fields, token: localStorage.wt})
}

export const commonAPIRequestLoginUser = async (username:string, password:string)=>{
    return await AxiosInstance.post(`/api/v1/users/login`,{username, password, token: localStorage.wt})
}