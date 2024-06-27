const APIServerUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
import config from './config'

type fetchChatroomDataArgs = {
    identifier: string,
    revalidate?: number | undefined
}

export const fetchChatroomData = async ({identifier, revalidate}: fetchChatroomDataArgs) => {
    try {

        const response = await fetch(
            `${APIServerUrl}/api/v1/chatrooms/getChatroom?identifier=${identifier}`,
            config({revalidate, tags: ['cacheItem']})
        );
        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData);
        }
        return response.json()
    } catch (error) {
        throw error;
    }
}