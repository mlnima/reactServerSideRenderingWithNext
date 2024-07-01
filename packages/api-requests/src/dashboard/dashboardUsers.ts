import AxiosInstance from '../lib/AxiosInstance';

export const dashboardAPIRequestChangePassword = async (oldPass: string, newPass: string, newPass2: string) => {
    return await AxiosInstance.post('/api/v1/user/resetPassword', { oldPass, newPass, newPass2, token: localStorage.wt });
};

export const dashboardAPIRequestDeleteUser = async (_id: string) => {
    return await AxiosInstance.delete(`/api/dashboard/user`, {
        params: {
            _id,
        },
    });
};

export const dashboardAPIRequestGenerateNewAPIKey = async () => {
    return await AxiosInstance.get('/api/dashboard/user/newAPIKey');
};

export const dashboardAPIRequestGetUser = async ({ _id, username, fields }: { _id?: string; username?: string; fields?: string[] }) => {
    return await AxiosInstance.get(
        `/api/dashboard/user`,
        {
            params:{
                _id,
                username,
                fields
            }
        }
    );
};

export const dashboardAPIRequestGetUsers = async (queriesData: string) => {
    return await AxiosInstance.get(`/api/dashboard/users${queriesData}`);
};

export const dashboardAPIRequestUpdateUser = async (data: {}) => {
    return await AxiosInstance.post('/api/v1/users/updateUser', { data, token: localStorage.wt });
};
