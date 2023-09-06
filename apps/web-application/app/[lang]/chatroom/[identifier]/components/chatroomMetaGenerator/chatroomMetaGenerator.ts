import {fetchChatroomData} from "fetch-requests";

interface IProps {
    params: {
        lang: string,
        identifier: string,
    }
}

const chatroomMetaGenerator = async ({params}: IProps) => {

    const chatroomsData = await fetchChatroomData({identifier: params.identifier})
    return {
        title: chatroomsData?.chatroom?.name || '',
        description: chatroomsData?.chatroom?.description || '',
        keywords: chatroomsData?.chatroom?.tags || '',
    }
}

export default chatroomMetaGenerator;