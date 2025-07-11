import { getDictionary } from '../../../../get-dictionary';
import './page.scss';
import ChatroomPageContent from './components/ChatroomPageContent/ChatroomPageContent';
import chatroomMetaGenerator from './components/chatroomMetaGenerator/chatroomMetaGenerator';
import { PageParams, PageSearchParams } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import getChatroom from '@lib/actions/database/chatrooms/getChatroom';
import Soft404 from '@components/Soft404/Soft404';

interface IProps {
  params: PageParams;
  searchParams?: PageSearchParams;
}

const chatroomPage = async (props: IProps) => {
  const params = await props.params;

  const { identifier } = params;

  const locale = localDetector(params.lang);
  const dictionary = await getDictionary(locale);

  if (!identifier) {
    return <Soft404 dictionary={dictionary} />;
  }

  const { success, data } = await getChatroom(identifier);

  if (!success || !data || !data.chatroom?._id) {
    return <Soft404 dictionary={dictionary} />;
  }
    return (
      <div id={'content'} className={`page-no-sidebar`} dir={'ltr'}>
        <main id={'primary'} className={'main chatroom'}>
          <ChatroomPageContent
            chatroom={data.chatroom}
            chatrooms={data.chatrooms}
            dictionary={dictionary}
            locale={locale}
          />
        </main>
      </div>
    );
};

export default chatroomPage;
export const generateMetadata = chatroomMetaGenerator;
