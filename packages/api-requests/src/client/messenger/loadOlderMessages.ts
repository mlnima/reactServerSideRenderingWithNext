import AxiosInstance from "../../lib/AxiosInstance";


interface IProps {
    limit: number,
    skip: number,
    conversationId: string
}
const loadOlderMessages = async ({limit, skip, conversationId}:IProps): Promise<void> => {

    return await AxiosInstance.get(`/api/v1/messenger/loadOlderMessages`, {
        params: {limit, skip, conversationId}
    });
};


export default loadOlderMessages;