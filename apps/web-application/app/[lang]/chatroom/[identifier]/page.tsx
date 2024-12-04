import {fetchChatroomData} from "@lib/fetch-requests/fetchChatrooms";
import {getDictionary} from "../../../../get-dictionary";
import './page.scss';
import ChatroomPageContent from "./components/ChatroomPageContent/ChatroomPageContent";
import chatroomMetaGenerator from "./components/chatroomMetaGenerator/chatroomMetaGenerator";
import {PageParams, PageSearchParams} from "@repo/typescript-types";
import localDetector from "@lib/localDetector";

interface IProps {
    params: PageParams,
    searchParams?: PageSearchParams,
}

const chatroomPage = async (props: IProps) => {
    const params = await props.params;

    const {
        identifier
    } = params;

    const locale = localDetector(params.lang);
    const dictionary = await getDictionary(locale);
    const chatroomsData = identifier ? await fetchChatroomData({identifier}) : {}

    return (
        <div id={'content'} className={`page-no-sidebar`} dir={'ltr'}>
            <main id={'primary'} className={'main chatroom'}>
                <ChatroomPageContent pageData={chatroomsData}  dictionary={dictionary} locale={locale}/>
            </main>
        </div>
    )
}

export default chatroomPage;
export const generateMetadata = chatroomMetaGenerator
export const dynamic = 'force-dynamic';