import { capitalizeFirstLetter } from '@repo/utils/dist/src';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import { IPageProps } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import getChatroom from '@lib/actions/database/chatrooms/getChatroom';

const alternatesGenerators = new AlternatesGenerators();

const chatroomMetaGenerator = async (props: IPageProps) => {
  const params = await props.params;
  const locale = localDetector(params.lang);

  if (!params.identifier) {
    return;
  }

  const { success, data } = await getChatroom(params.identifier);

  if (!success || !data) {
    return;
  }

  return {
    alternates: alternatesGenerators.chatroomPage(locale, params.identifier),
    title: data.chatroom?.name ? `${capitalizeFirstLetter(data.chatroom?.name)} Chatroom` : 'Chatroom',
    description: data.chatroom?.description || '',
    keywords: data.chatroom?.tags || '',
  };
};

export default chatroomMetaGenerator;
