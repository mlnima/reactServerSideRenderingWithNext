import AxiosInstance from '../lib/AxiosInstance';

export const clientAPIRequestDeleteConversation = async (_id: string) => {
    return await AxiosInstance.post(
        `/api/v1/users/deleteConversation?_id=${_id}&token=${localStorage.wt}`,
    );
};

export const clientAPIRequestFollowUser = async (_id: string) => {
    return await AxiosInstance.patch(`/api/v1/user/follow`, { _id, token: localStorage.wt });
};

export const clientAPIRequestGetConversations = async (_id: string) => {
    return await AxiosInstance.post(`/api/v1/users/getConversations`, {
        _id,
        token: localStorage.wt,
    });
};

export const clientAPIRequestRegisterUser = async (data: {}) => {
    return await AxiosInstance.post(`/api/v1/user`, data);
};

export const clientAPIRequestResetPassword = async (data: {}) => {
    return await AxiosInstance.post(`/api/v1/user/resetPassword`, {
        data
    });
};

export const clientAPIRequestUnFollowUser = async (_id: string) => {
    return await AxiosInstance.patch(`/api/v1/user/unfollow`, { _id, token: localStorage.wt });
};

