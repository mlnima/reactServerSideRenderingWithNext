import AxiosInstance from "../lib/AxiosInstance";

export const clientAPIRequestGetAConversation = async ({conversationId}: {
    conversationId: string
}): Promise<void> => {
    return await AxiosInstance.get(`/api/v1/messenger/getAConversation`, {
        params: {conversationId}
    });
};

export const clientAPIRequestGetConversationsList = async ({limit, skip}: {
    limit?: number,
    skip?: number
}): Promise<void> => {

    return await AxiosInstance.get(`/api/v1/messenger/getConversationsList`, {
        params: {
            limit,
            skip
        },
    });
};

export const clientAPIRequestLoadOlderMessages = async ({limit, skip, conversationId}: {
    limit: number,
    skip: number,
    conversationId: string
}): Promise<void> => {

    return await AxiosInstance.get(`/api/v1/messenger/loadOlderMessages`, {
        params: {limit, skip, conversationId}
    });
};


export const clientAPIRequestStartAConversation = async ({users}: {
    users: string[]
}): Promise<void> => {
    return await AxiosInstance.post(`/api/v1/messenger/startAConversation`, {
        users
    });
};