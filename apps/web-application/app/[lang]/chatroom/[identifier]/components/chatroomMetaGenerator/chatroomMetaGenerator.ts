import {fetchChatroomData} from "@lib/fetch-requests/fetchChatrooms";
import {capitalizeFirstLetter} from "@repo/shared-util";
import {AlternatesGenerators} from "@lib/alternatesCanonicalGenerator";

interface IProps {
    params: {
        lang: string,
        identifier: string,
    }
}
const alternatesGenerators = new AlternatesGenerators()
const chatroomMetaGenerator = async ({params}: IProps) => {

    const chatroomsData = await fetchChatroomData({identifier: params.identifier})
    return {
        alternates: alternatesGenerators.chatroomPage(params?.lang,params.identifier),
        title: chatroomsData?.chatroom?.name ? `${capitalizeFirstLetter(chatroomsData?.chatroom?.name)} Chatroom` : 'Chatroom',
        description: chatroomsData?.chatroom?.description || '',
        keywords: chatroomsData?.chatroom?.tags || '',
    }
}

export default chatroomMetaGenerator;