import AxiosInstance from "../../lib/AxiosInstance";

interface IProps {
    conversationId:string
}
const getAConversation = async ({conversationId}: IProps): Promise<void> => {
    return await AxiosInstance.get(`/api/v1/messenger/getAConversation`, {
        params: {conversationId}
    });
};

export default getAConversation;