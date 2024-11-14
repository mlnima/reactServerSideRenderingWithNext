import {fetchChatroomData} from "@lib/fetch-requests/fetchChatrooms";
import {capitalizeFirstLetter} from "@repo/shared-util";
import {AlternatesGenerators} from "@lib/alternatesCanonicalGenerator";
import {IPageProps} from "@repo/typescript-types";

const alternatesGenerators = new AlternatesGenerators()

const chatroomMetaGenerator = async (props: IPageProps) => {
    //const searchParams = await props.searchParams;
    const params = await props.params;

    const chatroomsData = await fetchChatroomData({identifier: params.identifier})
    return {
        alternates: alternatesGenerators.chatroomPage(params?.lang,params.identifier),
        title: chatroomsData?.chatroom?.name ? `${capitalizeFirstLetter(chatroomsData?.chatroom?.name)} Chatroom` : 'Chatroom',
        description: chatroomsData?.chatroom?.description || '',
        keywords: chatroomsData?.chatroom?.tags || '',
    }
}

export default chatroomMetaGenerator;