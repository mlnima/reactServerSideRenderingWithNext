import AxiosInstance from "../../lib/AxiosInstance";

interface IProps {
    users: string[]
}

const startAConversation = async ({users}: IProps): Promise<void> => {
    return await AxiosInstance.post(`/api/v1/messenger/startAConversation`, {
        users
    });
};

export default startAConversation;