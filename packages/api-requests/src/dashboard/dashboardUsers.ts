import AxiosInstance from "../lib/AxiosInstance";

export const dashboardAPIRequestChangePassword = async (oldPass:string, newPass:string, newPass2:string)=>{
    return await AxiosInstance.post('/api/v1/users/resetPassword',{oldPass, newPass, newPass2,token: localStorage.wt})
}

export const dashboardAPIRequestDeleteUser = async (id:string) => {
    const token = localStorage.getItem('wt');
    return await AxiosInstance.delete(`/api/admin/users/deleteUser?_id=${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
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


export const dashboardAPIRequestGetUsers = async (queriesData:string)=>{

    return await AxiosInstance.get(`/api/admin/users/getUsers${queriesData}&token=${localStorage.wt}`)
}


export const dashboardAPIRequestUpdateUser = async (data:{})=>{
    return await AxiosInstance.post('/api/v1/users/updateUser',{data,token: localStorage.wt})
}