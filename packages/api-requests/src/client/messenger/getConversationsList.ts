//getConversationsList
import AxiosInstance from "../../lib/AxiosInstance";

interface GetPrivateMessagesParams {
    limit?: number,
    skip?: number
}

const getConversationsList = async ({limit,skip}: GetPrivateMessagesParams): Promise<void> => {

    return await AxiosInstance.get(`/api/v1/messenger/getConversationsList`, {
        params: {
            limit,
            skip
        },
    });
};

export default getConversationsList;