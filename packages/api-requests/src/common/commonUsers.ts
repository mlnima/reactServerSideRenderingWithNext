import AxiosInstance from "../lib/AxiosInstance";

export const commonAPIRequestGetSignedInUserData = async (fields:string[])=>{
    return await AxiosInstance.post(`/api/v1/user/getSignedInUserData`,{fields, token: localStorage.wt})
}

export const commonAPIRequestLoginUser = async (username:string, password:string)=>{
    console.log('\x1b[33m%s\x1b[0m','process.env.NEXT_PUBLIC_API_SERVER_URL => ',process.env.NEXT_PUBLIC_API_SERVER_URL );
    return await AxiosInstance.get(`/api/v1/user/login`,{
        params:{
            username,
            password
        }
    })
}


export const getUserSuggestionList = async (keyword:string)=>{
    return await AxiosInstance.get(`/api/v1/user/suggestionList`,{
        params:{
            keyword
        }
    })
}

