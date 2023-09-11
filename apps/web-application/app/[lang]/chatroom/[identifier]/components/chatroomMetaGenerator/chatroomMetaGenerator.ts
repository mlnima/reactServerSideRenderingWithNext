import {fetchChatroomData} from "fetch-requests";
import {capitalizeFirstLetter} from "custom-util";

interface IProps {
    params: {
        lang: string,
        identifier: string,
    }
}

const chatroomMetaGenerator = async ({params}: IProps) => {

    const chatroomsData = await fetchChatroomData({identifier: params.identifier})
    return {
        title: chatroomsData?.chatroom?.name ? `${capitalizeFirstLetter(chatroomsData?.chatroom?.name)} Chatroom` : 'Chatroom',
        description: chatroomsData?.chatroom?.description || '',
        keywords: chatroomsData?.chatroom?.tags || '',
    }
}

export default chatroomMetaGenerator;