import { capitalizeFirstLetter } from '@repo/shared-util';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import { IPageProps } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import {getChatroom} from "@lib/database/operations/chatrooms";

const alternatesGenerators = new AlternatesGenerators();

//const now = new Date(performance.timeOrigin + performance.now());
const chatroomMetaGenerator = async (props: IPageProps) => {
    const params = await props.params;
    const locale = localDetector(params.lang);
    if (params.identifier) {
        //const chatroomsData = await fetchChatroomData({ identifier: params.identifier });
        const { chatroom } = await getChatroom(params.identifier);

        return {
            alternates: alternatesGenerators.chatroomPage(locale, params.identifier),
            title: chatroom?.name
                ? `${capitalizeFirstLetter(chatroom?.name)} Chatroom`
                : 'Chatroom',
            description: chatroom?.description || '',
            keywords: chatroom?.tags || '',
        };
    } else return {};
};

export default chatroomMetaGenerator;
