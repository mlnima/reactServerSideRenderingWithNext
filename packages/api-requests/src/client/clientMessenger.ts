import AxiosInstance from "../lib/AxiosInstance";

export const clientAPIRequestGetAConversation = async (_id:string): Promise<void> => {
    return await AxiosInstance.get(`/api/v1/messenger/conversation`, {
        params: {_id}
    });
};

export const clientAPIRequestGetConversationsList = async ({limit, skip}: {
    limit?: number,
    skip?: number
}): Promise<void> => {

    return await AxiosInstance.get(`/api/v1/messenger/conversations`, {
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

    return await AxiosInstance.get(`/api/v1/messenger/messages`, {
        params: {limit, skip, conversationId}
    });
};


export const clientAPIRequestStartAConversation = async ({users}: {
    users: string[]
}): Promise<void> => {
    return await AxiosInstance.post(`/api/v1/messenger/conversation`, {
        users
    });
};