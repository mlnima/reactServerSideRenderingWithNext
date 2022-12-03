import AxiosInstance from "../../lib/AxiosInstance";

const attendToEvent = async (postId, userId, actionType) => {
    const body = {
        id: postId,
        userId,
        actionType,
    };

    return await AxiosInstance.post('/api/v1/posts/attendToEvent', body)
}

export default attendToEvent;