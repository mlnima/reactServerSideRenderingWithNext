import { fetchChatroomData } from '@lib/fetch-requests/fetchChatrooms';
import { capitalizeFirstLetter } from '@repo/shared-util';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import { IPageProps } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';

const alternatesGenerators = new AlternatesGenerators();

const chatroomMetaGenerator = async (props: IPageProps) => {
    const params = await props.params;
    const locale = localDetector(params.lang);
    if (params.identifier) {
        const chatroomsData = await fetchChatroomData({ identifier: params.identifier });
        return {
            alternates: alternatesGenerators.chatroomPage(locale, params.identifier),
            title: chatroomsData?.chatroom?.name
                ? `${capitalizeFirstLetter(chatroomsData?.chatroom?.name)} Chatroom`
                : 'Chatroom',
            description: chatroomsData?.chatroom?.description || '',
            keywords: chatroomsData?.chatroom?.tags || '',
        };
    } else return {};
};

export default chatroomMetaGenerator;
