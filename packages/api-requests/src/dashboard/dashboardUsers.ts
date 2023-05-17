import AxiosInstance from "../lib/AxiosInstance";

export const dashboardAPIRequestChangePassword = async (oldPass, newPass, newPass2)=>{
    return await AxiosInstance.post('/api/v1/users/resetPassword',{oldPass, newPass, newPass2,token: localStorage.wt})
}

export const dashboardAPIRequestDeleteUser = async (id)=>{
    return await AxiosInstance.post('/api/admin/users/deleteUser',{id,token: localStorage.wt})
}


export const dashboardAPIRequestGenerateNewAPIKey = async ()=>{
    return await AxiosInstance.post('/api/admin/users/newAPIKey',{token: localStorage.wt})
}

export const dashboardAPIRequestGetUser = async ({ _id, username, fields }: {
    _id?: string;
    username?: string;
    fields?: string[];
}) => {
    const fieldsQuery = fields ? `&fields=${fields.join(',')}` : '';

    return await AxiosInstance.get(
        `/api/admin/users/getUser?${_id ? `&_id=${_id}` : ''}${username ? `&username=${username}` : ''}${fieldsQuery}&token=${localStorage.wt}`,
    );
};


export const dashboardAPIRequestGetUsers = async (queriesData)=>{

    return await AxiosInstance.get(`/api/admin/users/getUsers${queriesData}&token=${localStorage.wt}`)
}


export const dashboardAPIRequestUpdateUser = async (data)=>{
    return await AxiosInstance.post('/api/v1/users/updateUser',{data,token: localStorage.wt})
}